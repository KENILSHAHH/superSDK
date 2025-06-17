import {
    createWalletClient,
    custom,
    Address,
    createPublicClient
} from 'viem'
import { getConnectedWallet } from '../utils/getConnectedWallet'
import { switchChains } from '../utils/changeChains'
import {getAggregatedBalance} from './getAggregatedBalance'
import { defaultChains } from "../config/chains";
import { bridgeERC20 } from '../contract/erc20Bridge'
import { getBalance } from './getBalance'


export async function sendERC20(
    to: Address,
    amount: bigint,
    tokenAddress : Address,
    chainId: number
): Promise<string | undefined> {
    if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No Ethereum provider found')
      }
    const from = await getConnectedWallet();
    if (!from) {
        throw new Error("No connected wallet");
    }
    const availableBalance = await getAggregatedBalance(from, tokenAddress);
    console.log(availableBalance);
    let required = amount;
    let available = availableBalance.total;
    if (required  > available) {
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
    
    const defaultBalance = await getBalance(from, destinationChain, tokenAddress);
    console.log("Default chain balance:", defaultBalance);
    // If sufficient balance on default chain, send and exit
    if (defaultBalance.balance >= required) {
        console.log('error here')
    await switchChains(destinationChain, destinationWalletClient);

        const hash = await destinationWalletClient.sendTransaction({
        account: from,
        to,
        value: required <= defaultBalance.balance ? required : defaultBalance.balance,
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
       
        if (currentChainId != chain.id) {
            console.log("current chain id: ", currentChainId);
            console.log("chain id: ", chain.id);
            console.log(`Switching to ${chain.name}...`);
            const walletClient = createWalletClient({
                chain: chain,
                transport: custom(window.ethereum),
            });
            await switchChains(chain, walletClient);
        }
        const walletClient = createWalletClient({
            chain: chain,
            transport: custom(window.ethereum),
        });
        const publicClient = createPublicClient({
            chain: chain,
            transport: custom(window.ethereum),
        });
            const balance = await getBalance(from, chain);
            if (balance.balance > 0) {
                if (chain.id == destinationChainId) {
                    console.log("Required before sending: ", required);
                    let value: bigint = balance.balance;
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
                    let value: bigint = balance.balance;
                    const txLink = await bridgeERC20(tokenAddress, required <= value? required : value, to, publicClient, walletClient, destinationChainId);
                    console.log(required,value)
                    required = required - value;
                    console.log("Required after bridging: ", required);
                }
            }
        }
    
}
