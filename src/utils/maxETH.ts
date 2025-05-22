import {
    createWalletClient,
    createPublicClient,
    Address,
    custom,
    encodeFunctionData,
Hex,
PublicClient,
 } from "viem";
import abi from "../../abi/superchainWETH.json";
export async function sendMaxEth( publicClient :PublicClient , from: Address, to: Address): Promise<bigint> {
        const balance = await publicClient.getBalance({ address: from })
        const gasEstimate = await publicClient.estimateGas({
            account: from,
            to,
            value: balance,
        });
        const gasPrice = await publicClient.getGasPrice();
        const gasCost = gasEstimate * gasPrice;
        const maxTransferable = balance - gasCost;
        if (maxTransferable <= 0n) {
            throw new Error('Insufficient funds to cover gas');
        }
        return maxTransferable;
    }