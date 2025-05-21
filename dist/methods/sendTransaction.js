"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendETH = sendETH;
const viem_1 = require("viem");
const getConnectedWallet_1 = require("../utils/getConnectedWallet");
const changeChains_1 = require("../utils/changeChains");
const maxETH_1 = require("../utils/maxETH");
const getAggregatedBalance_1 = require("./getAggregatedBalance");
const chains_1 = require("../config/chains");
const ethBridge_1 = require("../contract/ethBridge");
const getBalance_1 = require("./getBalance");
async function sendETH(to, amount, tokenAddress, chainId) {
    const from = await (0, getConnectedWallet_1.getConnectedWallet)();
    if (!from) {
        throw new Error('Wallet not connected');
    }
    const availableETH = await (0, getAggregatedBalance_1.getAggregatedBalance)(from);
    console.log(availableETH);
    let required = amount;
    let available = availableETH.total;
    if (required - available > 0.00002) {
        throw new Error("Insufficient balance");
    }
    let defaultChainId = chains_1.defaultChains[0].id;
    if (chainId != defaultChainId) {
        defaultChainId = chainId;
    }
    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    for (const chain of chains_1.defaultChains) {
        const walletClient = (0, viem_1.createWalletClient)({
            chain: chain,
            transport: window.ethereum,
        });
        if (parseInt(currentChainId, 16) !== chain.id) {
            console.log(`Switching to ${chain.name}...`);
            await (0, changeChains_1.switchChains)(chain, walletClient);
            const balance = await (0, getBalance_1.getBalance)(from, chain);
            if (balance.balance >= 0.0001) {
                if (chain.id == defaultChainId) {
                    const value = await (0, maxETH_1.sendMaxEth)(from, to, chain);
                    console.log(value);
                    const hash = await walletClient.sendTransaction({
                        account: from,
                        to: to,
                        value: value,
                        chain: walletClient.chain
                    });
                    required = required - value;
                    const txLink = `${chain.blockExplorers?.default.url}/tx/${hash}`;
                    console.log(txLink);
                }
                else {
                    const value = await (0, maxETH_1.sendMaxEth)(from, to, chain);
                    const txLink = await (0, ethBridge_1.bridgeETH)(value, to, chain, defaultChainId);
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
//# sourceMappingURL=sendTransaction.js.map