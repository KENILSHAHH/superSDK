import {
    createWalletClient,
    custom,
    Address,
} from 'viem'
import { getConnectedWallet } from '../utils/getConnectedWallet'
import { switchChains } from '../utils/changeChains'
import { sendMaxEth } from '../utils/maxETH'
import {getAggregatedBalance} from './getAggregatedBalance'
import { bigintToNumber, numberToBigint } from '../utils/typeConversions'
import { defaultChains } from "../config/chains";
import { bridgeETH } from '../contract/ethBridge'
import { getBalance } from './getBalance'

export async function sendETH(
    to: Address,
    amount: bigint,
    tokenAddress: string | undefined,
    chainId: number
) {
    const from = await getConnectedWallet();
    
    if (!from) {
        throw new Error('Wallet not connected');
    }
    const availableETH = await getAggregatedBalance(from);
    console.log(availableETH);
    let required = amount;
    let available = availableETH.total;
    if (required - available > 0.00002) {
        throw new Error("Insufficient balance");
    }
    let defaultChainId = defaultChains[0].id;
    if (chainId != defaultChainId) {
        defaultChainId = chainId;
    }
    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
   
    for (const chain of defaultChains) {
        const walletClient = createWalletClient({
            chain: chain,
            transport: window.ethereum,
        });
        if (parseInt(currentChainId, 16) !== chain.id) {
            console.log(`Switching to ${chain.name}...`);
            await switchChains(chain, walletClient);
            const balance = await getBalance(from, chain);
            if (balance.balance >= 0.0001) {
                if (chain.id == defaultChainId) {
                    const value = await sendMaxEth(from, to, chain)
                    console.log(value);
                    const hash = await walletClient.sendTransaction({
                        account: from,
                        to: to,
                        value: value,
                        chain: walletClient.chain
                    });
                    required = required - value;
                    const txLink = `${chain.blockExplorers?.default.url}/tx/${hash}`
                    console.log(txLink);
                }
                else {
                    const value = await sendMaxEth(from, to, chain);
                    const txLink = await bridgeETH(value, to, chain, defaultChainId);
                    required = required - value;
                    console.log(txLink);
                }
            }
            else { 
                continue;
            }
           
        }
    }
}

    // Usage example

     



