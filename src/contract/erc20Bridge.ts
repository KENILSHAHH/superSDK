import { contracts } from "@eth-optimism/viem";
import { Address, ChainConfig,createPublicClient, createWalletClient, custom, Chain, parseEther } from "viem";
import  abi  from "../../abi/superchainERC20.json";


export async function bridgeERC20(
    tokenAddress: Address,
    amount:string,
    to: Address,
    fromChain: Chain,
    toChain: BigInt,
) {
    const publicClient = createPublicClient({
        chain: fromChain,
        transport: custom(window.ethereum)
    });
    console.log("publicClient", publicClient);
    const client = createWalletClient({
        chain: fromChain,
        transport: custom(window.ethereum)
    });
    console.log("client", client);
    const [account] = await client.getAddresses();
    const amountInBigint = parseEther(amount);
    const { request } = await publicClient.simulateContract({
        address: contracts.superchainTokenBridge.address,
        abi: abi,
        functionName: "sendERC20",
        args: [tokenAddress, to, amountInBigint, toChain],
        account: account,
    });

    const tx = await client.writeContract(request);
    return `${fromChain.blockExplorers?.default.url}/tx/${tx}`
}