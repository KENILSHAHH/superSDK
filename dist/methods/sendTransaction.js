"use strict";
// import {
//     createWalletClient,
//     http,
//     custom,
//     publicActions,
//     getContract,
//     Address,
//     formatEther,
//     formatUnits,
//     createPublicClient,
// } from 'viem'
// import { EthereumProvider } from '../types'
// import { sendMaxEth } from '../utils/maxETH'
// import { privateKeyToAccount } from 'viem/accounts'
// import {getBalance} from './getBalance'
// import { 
//     supersimL2A, 
//     supersimL2B, 
//     interopAlpha0, 
//     interopAlpha1 
// } from '@eth-optimism/viem/src/chains'
// import {
//     walletActionsL2,
//     publicActionsL2,
//     contracts as optimismContracts
// } from '@eth-optimism/viem'
// import superchainWETH from '../../abi/superchainWETH.json'
// import { defaultChains } from "../config/chains";
// export async function sendETH(
//     from: string,
//     to: Address,
//     amount: number,
//     tokenAddress: string | undefined,
//     chainId: number
// ): Promise<string> {
//     const availableETH = await getBalance(from);
//     console.log(availableETH);
//     let value : string = amount.toString();
//     if (value - availableETH.total) {
//         throw new Error("Insufficient balance");
//     }
//     let defaultChainId = defaultChains[0].chainId;
//     if (chainId != defaultChainId) {
//         defaultChainId = chainId;
//     }
//     for (const chain of defaultChains) {
//         if (typeof window !== 'undefined' && window.ethereum) {
//             // Create a wallet client using window.ethereum
//             const walletClient = createWalletClient({
//                 transport: custom(window.ethereum), // Use http transport with window.ethereum
//             });
//             const [account] = await walletClient.getAddresses();
//             if (chain.chainId == defaultChainId) {
//                 const value = await sendMaxEth(account, interopAlpha0)
//                 console.log(value);
//                 const hash = await walletClient.sendTransaction({
//                     account,
//                     to: to,
//                     value: value,
//                     chain: walletClient.chain
//                 });
//                 amount = amount - value
//                 const txLink = `${chain.blockexplorer}/tx/${hash}`
//                 console.log(txLink);
//             }
//         } else {
//             console.error('window.ethereum is not available. Please install MetaMask or another Ethereum wallet.');
//         }
//     }
//     // Usage example
// }
//# sourceMappingURL=sendTransaction.js.map