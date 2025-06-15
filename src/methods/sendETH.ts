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
    let destinationChainId = defaultChains[0].id;
    if (chainId) {
        destinationChainId = chainId;
    }
    const currentChainHex = await window.ethereum.request({ method: 'eth_chainId' });
    console.log(currentChainHex);
    const currentChainId = parseInt(currentChainHex as string, 16)
    console.log(`Current chain ID: ${currentChainId}`);
    const destinationChain = defaultChains.find(c => c.id === destinationChainId);
    if (!destinationChain) {
        throw new Error(`Chain with id ${destinationChainId} not found in defaultChains`);
    }
    

    const destinationWalletClient = createWalletClient({
      chain: destinationChain,
      transport: custom(window.ethereum),
    });
    const destinationPublicClient = createPublicClient({
      chain: destinationChain,
      transport: custom(window.ethereum),
    });
    
    const defaultBalance = await getBalance(from, destinationChain);
    console.log("Default chain balance:", defaultBalance);
    // If sufficient balance on default chain, send and exit
    if (defaultBalance.balance >= required) {
        console.log('error here')
    await switchChains(destinationChain, destinationWalletClient);
      const value = await sendMaxEth(destinationPublicClient, from, to);
        const hash = await destinationWalletClient.sendTransaction({
        account: from,
        to,
        value: required <= value ? required : value,
        chain: destinationChain
      });
    console.log("error here 2")
      const txLink = `${destinationChain.blockExplorers?.default.url}/tx/${hash}`;
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
        }
            const balance = await getBalance(from, chain);
            if (balance.balance >= 0.001) {
                if (chain.id == destinationChainId) {
                    console.log("Required before sending: ", required);
                    const value = await sendMaxEth(publicClient, from, to)
                    console.log(value);
                    const hash = await walletClient.sendTransaction({
                        account: from,
                        to: to,
                        value: required <= value ? required : value,
                        chain: walletClient.chain
                    });
                    required = required - value;
                    console.log("value: ", value);
                    console.log("Required after sending: ", required);
                    const txLink = `${chain.blockExplorers?.default.url}/tx/${hash}`
                    console.log(txLink);
                }
                else {
                    console.log("Requried before bridging: ", required);
                    console.log("Bridging ETH to default chain");
                    const value = await bridgeMaxETH(publicClient, from, to , destinationChainId)
                    const txLink = await bridgeETH(required <= value? required : value, to, publicClient, walletClient, destinationChainId);
                    console.log(required,value)
                    required = required - value;
                    console.log("Required after bridging: ", required);
                }
            }
            else { 
                continue;
            }
           
        }
    
}



     



