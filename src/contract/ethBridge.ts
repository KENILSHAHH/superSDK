import { contracts } from "@eth-optimism/viem";
import { Address, WalletClient, PublicClient } from "viem";
import abi from "../../abi/superchainWETH.json";

export async function bridgeETH(
    amount: bigint,
    to: Address,
    publicClient: PublicClient,
    walletClient: WalletClient,
    toChain: Number,
) {
    const [account] = await walletClient.getAddresses();
    const { request } = await publicClient.simulateContract({
        address: contracts.superchainETHBridge.address,
        abi: abi,
        functionName: "sendETH",
        args: [ to, toChain],
        account: account,
        value: amount,
    });
    const tx = await walletClient.writeContract(request);
    return `${walletClient.chain?.blockExplorers?.default.url}/tx/${tx}`
}