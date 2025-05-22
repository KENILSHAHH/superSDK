import { contracts } from "@eth-optimism/viem";
import { Address, ChainConfig,createPublicClient, createWalletClient, custom, Chain, parseEther } from "viem";
import  abi  from "../../abi/superchainWETH.json";


export async function bridgeETH(
    amount: bigint,
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
    const [account] = await client.getAddresses();
    const { request } = await publicClient.simulateContract({
        address: contracts.superchainETHBridge.address,
        abi: abi,
        functionName: "sendETH",
        args: [ to, toChain],
        account: account,
        value: amount,
    });
    const tx = await client.writeContract(request);
    return `${fromChain.blockExplorers?.default.url}/tx/${tx}`
}