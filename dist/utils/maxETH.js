"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMaxEth = sendMaxEth;
const viem_1 = require("viem");
async function sendMaxEth(to, chain) {
    if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('window.ethereum is not available.');
    }
    // Create wallet client (for signing & sending)
    const walletClient = (0, viem_1.createWalletClient)({
        chain: chain,
        transport: (0, viem_1.custom)(window.ethereum),
    });
    // Create public client (for reading chain data)
    const publicClient = (0, viem_1.createPublicClient)({
        chain: chain,
        transport: (0, viem_1.custom)(window.ethereum),
    });
    const [account] = await walletClient.getAddresses();
    // Step 1: Get full balance
    const balance = await publicClient.getBalance({ address: account });
    // Step 2: Estimate gas for sending ETH
    const gasEstimate = await publicClient.estimateGas({
        account,
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