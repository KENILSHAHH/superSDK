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
): Promise<string | undefined> {
    if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No Ethereum provider found')
      }
    const from = await getConnectedWallet();
    if (!from) {
        throw new Error("No connected wallet");
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
    const currentChainHex = await window.ethereum.request({ method: 'eth_chainId' });
    console.log(currentChainHex);
    const currentChainId = parseInt(currentChainHex as string, 16)
    for (const chain of defaultChains) {
        const walletClient = createWalletClient({
            chain: chain,
            transport: custom(window.ethereum),
        });
        if (currentChainId !== chain.id) {
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
                    return txLink;
                }
                else {
                    const value = await sendMaxEth(from, to, chain);
                    const txLink = await bridgeETH(value, to, chain, defaultChainId);
                    required = required - value;
                    console.log(txLink);
                    return txLink;
                }
            }
            else { 
                continue;
            }
           
        }
    }
}



     



