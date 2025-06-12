"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = getBalance;
const viem_1 = require("viem");
const viem_2 = require("viem");
async function getBalance(address, chain, tokenAddress) {
    const client = (0, viem_1.createPublicClient)({
        chain,
        transport: (0, viem_1.http)(window.ethereum),
    });
    if (!tokenAddress) {
        // Native ETH balance
        const rawBalance = await client.getBalance({ address });
        return {
            asset: chain.nativeCurrency.symbol,
            chain: chain.name,
            balance: rawBalance, // raw bigint
        };
    }
    else {
        // ERC20 token balance
        const [rawBalance, symbol] = await Promise.all([
            client.readContract({
                address: tokenAddress,
                abi: viem_2.erc20Abi,
                functionName: 'balanceOf',
                args: [address],
            }),
            client.readContract({
                address: tokenAddress,
                abi: viem_2.erc20Abi,
                functionName: 'symbol',
            }),
        ]);
        return {
            asset: symbol,
            chain: chain.name,
            balance: rawBalance, // raw bigint
        };
    }
}
//# sourceMappingURL=getBalance.js.map