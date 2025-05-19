import { contracts } from "@eth-optimism/viem";
import { Address, ChainConfig,createPublicClient, createWalletClient, custom, Chain, parseEther } from "viem";
import  abi  from "../../abi/superchainERC20.json";


export async function bridgeETH(
    amount: string,
    to: Address,
    fromChain: Chain,
    toChain: Number,
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
    const amountInBigint = parseEther(amount)
    const [account] = await client.getAddresses();
    const { request } = await publicClient.simulateContract({
        address: contracts.superchainETHBridge.address,
        abi: abi,
        functionName: "sendETH",
        args: [ to, toChain],
        account: account,
        value: amountInBigint,
    });
    
    const tx = await client.writeContract(request);
    return `${fromChain.blockExplorers?.default.url}/tx/${tx}`
}