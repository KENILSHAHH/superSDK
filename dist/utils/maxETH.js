"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMaxEth = sendMaxEth;
const viem_1 = require("viem");
async function sendMaxEth(from, to, chain) {
    // Create public client (for reading chain data)
    const publicClient = (0, viem_1.createPublicClient)({
        chain: chain,
        transport: (0, viem_1.custom)(window.ethereum),
    });
    // Step 1: Get full balance
    const balance = await publicClient.getBalance({ address: from });
    // Step 2: Estimate gas for sending ETH
    const gasEstimate = await publicClient.estimateGas({
        account: from,
        to,
        value: balance,
    });
    // Step 3: Get gas price
    const gasPrice = await publicClient.getGasPrice();
    // Step 4: Calculate transferable amount
    const gasCost = gasEstimate * gasPrice;
    const maxTransferable = balance - gasCost;
    if (maxTransferable <= 0n) {
        throw new Error('Insufficient funds to cover gas');
    }
    return maxTransferable;
}
//# sourceMappingURL=maxETH.js.map