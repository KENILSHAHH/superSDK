import {
    createWalletClient,
    custom,
    Address,

} from 'viem'
import { switchChains } from '../utils/changeChains'
import { sendMaxEth } from '../utils/maxETH'
import {getBalance} from './getAggregatedBalance'
import { bigintToNumber, numberToBigint } from '../utils/typeConversions'
import { defaultChains } from "../config/chains";
import { bridgeETH } from '../contract/ethBridge'

export async function sendETH(
    from: string,
    to: Address,
    amount: number,
    tokenAddress: string | undefined,
    chainId: number
){
    
    const availableETH = await getBalance(from);
    console.log(availableETH);
    let required = amount;
    let available = Number(availableETH.total);
    if (required - available > 0.00002) {
        throw new Error("Insufficient balance");
    }
    let defaultChainId = defaultChains[0].id;
    if (chainId != defaultChainId) {
        defaultChainId = chainId;
    }
    for (const chain of defaultChains) {
    
        if (typeof window !== 'undefined' && window.ethereum) {
            // Create a wallet client using window.ethereum
            const walletClient = createWalletClient({
                transport: custom(window.ethereum),
                chain : chain // Use http transport with window.ethereum
            });        
            const [account] = await walletClient.getAddresses();
            if (walletCli)
            if (chain.id == defaultChainId) {
                const value = await sendMaxEth(account, chain)
                console.log(value);
                const hash = await walletClient.sendTransaction({
                    account,
                    to: to,
                    value: value,
                    chain: walletClient.chain
                });
                required = required - bigintToNumber(value);
                const txLink = `${chain.blockExplorers?.default.url}/tx/${hash}`
                console.log(txLink);
            }
            else { 

                const value = await sendMaxEth(account, chain)
                const txLink = await bridgeETH(value.toString(),to, chain, defaultChainId )
            }
           
        } else {
            console.error('window.ethereum is not available. Please install MetaMask or another Ethereum wallet.');
        }
    }

    // Usage example

     
}


