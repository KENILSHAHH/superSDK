"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMaxEth = sendMaxEth;
async function sendMaxEth(publicClient, from, to) {
    const balance = await publicClient.getBalance({ address: from });
    const gasEstimate = await publicClient.estimateGas({
        account: from,
        to,
        value: balance,
    });
    const gasPrice = await publicClient.getGasPrice();
    const gasCost = gasEstimate * gasPrice;
    const maxTransferable = balance - gasCost;
    if (maxTransferable <= 0n) {
        throw new Error('Insufficient funds to cover gas');
    }
    return maxTransferable;
}
//# sourceMappingURL=maxETH.js.map