import {
    createWalletClient,
    createPublicClient,
    Address,
    custom,

 } from "viem";

export async function sendMaxEth(from: Address, to: Address, chain: any): Promise<bigint> {
       

        // Create public client (for reading chain data)
        const publicClient = createPublicClient({
            chain: chain,
            transport: custom(window.ethereum),
        });

     

        // Step 1: Get full balance
        const balance = await publicClient.getBalance({ address: from });

        // Step 2: Estimate gas for sending ETH
        const gasEstimate = await publicClient.estimateGas({
            account: from,
            to,
            value: balance,
        });

        // Step 3: Get gas price
        const gasPrice = await publicClient.getGasPrice();

        // Step 4: Calculate transferable amount
        const gasCost = gasEstimate * gasPrice;
        const maxTransferable = balance - gasCost;

        if (maxTransferable <= 0n) {
            throw new Error('Insufficient funds to cover gas');
        }

        return maxTransferable;
    }