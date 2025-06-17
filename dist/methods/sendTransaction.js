"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTransaction = sendTransaction;
const viem_1 = require("viem");
const chains_1 = require("../config/chains");
const getAggregatedBalance_1 = require("./getAggregatedBalance");
const sendETH_1 = require("./sendETH");
const changeChains_1 = require("../utils/changeChains");
async function sendTransaction({ contractAddress, chainId, userAddress, functionName, functionParams, abi, value }) {
    if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No Ethereum provider found');
    }
    const destinationChain = chains_1.defaultChains.find(c => c.id === chainId);
    if (!destinationChain) {
        throw new Error(`Chain with id ${chainId} not found`);
    }
    const currentChainHex = await window.ethereum.request({ method: 'eth_chainId' });
    const currentChainId = parseInt(currentChainHex, 16);
    const switchWalletClient = (0, viem_1.createWalletClient)({
        chain: destinationChain,
        transport: (0, viem_1.custom)(window.ethereum),
    });
    if (currentChainId !== chainId) {
        await (0, changeChains_1.switchChains)(destinationChain, switchWalletClient);
    }
    const publicClient = (0, viem_1.createPublicClient)({
        chain: destinationChain,
        transport: (0, viem_1.custom)(window.ethereum),
    });
    const simulation = await publicClient.simulateContract({
        address: contractAddress,
        abi,
        functionName,
        args: functionParams,
        account: userAddress,
        value: value ?? 0n,
    });
    const requiredETH = simulation.request.value ?? 0n;
    const aggregated = await (0, getAggregatedBalance_1.getAggregatedBalance)(userAddress);
    if (aggregated.total < requiredETH) {
        throw new Error("Insufficient aggregated ETH balance");
    }
    if (requiredETH > 0n) {
        const bridgetx = await (0, sendETH_1.sendETH)(userAddress, requiredETH, chainId);
    }
    const walletClient = (0, viem_1.createWalletClient)({
        chain: destinationChain,
        transport: (0, viem_1.custom)(window.ethereum),
    });
    const txHash = await walletClient.sendTransaction({
        ...simulation.request,
        to: contractAddress,
    });
    return `${destinationChain.blockExplorers?.default.url}/tx/${txHash}`;
}
//# sourceMappingURL=sendTransaction.js.map