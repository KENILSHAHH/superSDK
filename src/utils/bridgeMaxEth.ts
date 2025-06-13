import {
    createWalletClient,
    createPublicClient,
    Address,
    custom,
    PublicClient,
    Hex,
    encodeFunctionData
} from "viem";
import abi from "../../abi/superchainWETH.json";
import { addresses } from "../config/addresses";
 import { contracts } from "@eth-optimism/viem";

export async function bridgeMaxETH(publicClient: PublicClient, from: Address, to: Address, value: bigint, toChain: number): Promise<bigint> {
    const bridgeAddress = contracts.superchainETHBridge.address;

    const balance = await publicClient.getBalance({ address: from });
    console.log("Wallet balance:", balance);

    if (value > balance) {
        throw new Error("Requested value exceeds wallet balance");
    }

    const encodedData: Hex = encodeFunctionData({
        abi,
        functionName: 'sendETH',
        args: [to, BigInt(toChain)],
    });

    const gasPrice = await publicClient.getGasPrice();
    console.log("Gas price:", gasPrice);

    let gasEstimate: bigint;

    try {
        gasEstimate = await publicClient.estimateGas({
            account: from,
            to: bridgeAddress,
            data: encodedData,
            value,
        });
    } catch (err) {
        console.error("Gas estimation failed. Trying simulation...", err);

        const simulated = await publicClient.simulateContract({
            address: bridgeAddress,
            abi,
            functionName: 'sendETH',
            args: [to, BigInt(toChain)],
            account: from,
            value,
        });

        if (simulated.request.gas === undefined) {
            throw new Error("Gas estimation failed and simulation did not return gas estimate");
        }
        gasEstimate = simulated.request.gas;
        console.log("Simulated gas estimate:", gasEstimate);
    }

    const gasCost = gasEstimate * gasPrice;
    const maxTransferable = balance - gasCost;

    if (maxTransferable <= 0n) {
        throw new Error('Insufficient funds to cover gas');
    }

    return maxTransferable;
}