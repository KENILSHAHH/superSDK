"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = getBalance;
async function getBalance({ address, chain, tokenAddress, }) {
    const client = createPublicClient({
        chain,
        transport: http(),
    });
    if (!tokenAddress) {
        // Fetch native ETH balance
        return client.getBalance({ address });
    }
    else {
        // Fetch ERC20 token balance
        return client.readContract({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [address],
        });
    }
}
//# sourceMappingURL=getBalance.js.map