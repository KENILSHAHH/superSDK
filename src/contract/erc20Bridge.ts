import { contracts } from "@eth-optimism/viem";
import { Address, ChainConfig,createPublicClient, createWalletClient, custom, Chain, parseEther, PublicClient, WalletClient } from "viem";
import  abi  from "../../abi/superchainERC20.json";



export async function bridgeERC20(
    tokenAddress: Address,
    amount:bigint,
    to: Address,
    publicClient: PublicClient,
    walletClient: WalletClient,
    toChain: Number,
) {

    const [account] = await walletClient.getAddresses();
    
    const { request } = await publicClient.simulateContract({
        address: contracts.superchainTokenBridge.address,
        abi: abi,
        functionName: "sendERC20",
        args: [tokenAddress, to, amount, toChain],
        account: account,
    });

    const tx = await walletClient.writeContract(request);
    return `${walletClient.chain?.blockExplorers?.default.url}/tx/${tx}`
}