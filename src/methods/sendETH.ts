import {
    createWalletClient,
    custom,
    Address,
    createPublicClient
} from 'viem'
import { Chain } from 'viem'
import { getConnectedWallet } from '../utils/getConnectedWallet'
import { switchChains } from '../utils/changeChains'
import { sendMaxEth } from '../utils/maxETH'
import {getAggregatedBalance} from './getAggregatedBalance'
import { bigintToNumber, numberToBigint } from '../utils/typeConversions'
import { defaultChains } from "../config/chains";
import { bridgeETH } from '../contract/ethBridge'
import { getBalance } from './getBalance'
import { bridgeMaxETH } from '../utils/bridgeMaxEth'

export async function sendETH(
    to: Address,
    amount: bigint,
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
    console.log(`Current chain ID: ${currentChainId}`);
    const defaultChain = defaultChains.find(c => c.id === defaultChainId);
    if (!defaultChain) {
        throw new Error(`Chain with id ${defaultChainId} not found in defaultChains`);
    }
    

    const defaultWalletClient = createWalletClient({
      chain: defaultChain,
      transport: custom(window.ethereum),
    });
    const defaultPublicClient = createPublicClient({
      chain: defaultChain,
      transport: custom(window.ethereum),
    });
    
    const defaultBalance = await getBalance(from, defaultChain);
    console.log("Default chain balance:", defaultBalance);
    // If sufficient balance on default chain, send and exit
    if (defaultBalance.balance >= required) {
        console.log('error here')
    await switchChains(defaultChain, defaultWalletClient);
      const value = await sendMaxEth(defaultPublicClient, from, to);
      const hash = await defaultWalletClient.sendTransaction({
        account: from,
        to,
        value: required <= value ? required : value,
        chain: defaultChain
      });
    console.log("error here 2")
      const txLink = `${defaultChain.blockExplorers?.default.url}/tx/${hash}`;
      console.log("Sent from default chain:", txLink);
      return txLink;
    }
    for (const chain of defaultChains) {
        if (required <= 0) {
            console.log("hey bitch");
            break;
        }
        const walletClient = createWalletClient({
            chain: chain,
            transport: custom(window.ethereum),
        });
        const publicClient = createPublicClient({
            chain: chain,
            transport: custom(window.ethereum),
        });
        if (currentChainId != chain.id) {
            console.log("current chain id: ", currentChainId);
            console.log("chain id: ", chain.id);
            console.log(`Switching to ${chain.name}...`);
            await switchChains(chain, walletClient);
            const balance = await getBalance(from, chain);
            if (balance.balance >= 0.1) {
                console.log("this is working fine")
                if (chain.id == defaultChainId) {
                    const value = await sendMaxEth(publicClient, from, to)
                    console.log(value);
                    const hash = await walletClient.sendTransaction({
                        account: from,
                        to: to,
                        value: required <= value ? required : value,
                        chain: walletClient.chain
                    });
                    required = required - value;
                    console.log(required, value);
                    const txLink = `${chain.blockExplorers?.default.url}/tx/${hash}`
                    console.log(txLink);
                }
                else {
                    console.log("Bridging ETH to default chain");
                    const value = await bridgeMaxETH(publicClient, from, to, required , defaultChainId)
                    const txLink = await bridgeETH(required <= value? required : value, to, publicClient, walletClient, defaultChainId);
                    required = required - value;
                    console.log(required, value)
                }
            }
            else { 
                continue;
            }
           
        }
    }
}



     



