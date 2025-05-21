"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendETH = sendETH;
const viem_1 = require("viem");
const maxETH_1 = require("../utils/maxETH");
const getAggregatedBalance_1 = require("./getAggregatedBalance");
const typeConversions_1 = require("../utils/typeConversions");
const chains_1 = require("../config/chains");
const ethBridge_1 = require("../contract/ethBridge");
async function sendETH(from, to, amount, tokenAddress, chainId) {
    const availableETH = await (0, getAggregatedBalance_1.getBalance)(from);
    console.log(availableETH);
    let required = amount;
    let available = Number(availableETH.total);
    if (required - available > 0.00002) {
        throw new Error("Insufficient balance");
    }
    let defaultChainId = chains_1.defaultChains[0].id;
    if (chainId != defaultChainId) {
        defaultChainId = chainId;
    }
    for (const chain of chains_1.defaultChains) {
        if (typeof window !== 'undefined' && window.ethereum) {
            // Create a wallet client using window.ethereum
            const walletClient = (0, viem_1.createWalletClient)({
                transport: (0, viem_1.custom)(window.ethereum),
                chain: chain // Use http transport with window.ethereum
            });
            const [account] = await walletClient.getAddresses();
            if (walletCli)
                if (chain.id == defaultChainId) {
                    const value = await (0, maxETH_1.sendMaxEth)(account, chain);
                    console.log(value);
                    const hash = await walletClient.sendTransaction({
                        account,
                        to: to,
                        value: value,
                        chain: walletClient.chain
                    });
                    required = required - (0, typeConversions_1.bigintToNumber)(value);
                    const txLink = `${chain.blockExplorers?.default.url}/tx/${hash}`;
                    console.log(txLink);
                }
                else {
                    const value = await (0, maxETH_1.sendMaxEth)(account, chain);
                    const txLink = await (0, ethBridge_1.bridgeETH)(value.toString(), to, chain, defaultChainId);
                }
        }
        else {
            console.error('window.ethereum is not available. Please install MetaMask or another Ethereum wallet.');
        }
    }
    // Usage example
}
//# sourceMappingURL=sendTransaction.js.map