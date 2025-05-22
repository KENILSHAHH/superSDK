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

export async function bridgeMaxETH(publicClient: PublicClient,  from: Address, to: Address,  value : bigint, toChain: Number): Promise<bigint> {
        // Create public client (for reading chain data)
 
        // Step 1: Get full balance
        const balance = await publicClient.getBalance({ address: from });
        // Step 2: Estimate gas for sending ETH
        const data: Hex = encodeFunctionData({
            abi: abi,
            functionName: 'sendETH',
            args: [to, toChain],
          })

        // Step 3: Get gas price
        const gasPrice = await publicClient.getGasPrice();
        const gasEstimate = await publicClient.estimateGas({
            account: from,
            to: contracts.superchainETHBridge.address,
            data,
            value: value,
        });
        // Step 4: Calculate transferable amount
        const gasCost = gasEstimate * gasPrice;
        const maxTransferable = balance - gasCost;

        if (maxTransferable <= 0n) {
            throw new Error('Insufficient funds to cover gas');
        }

        return maxTransferable;
    }