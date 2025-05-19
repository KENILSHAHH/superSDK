"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = getBalance;
const ethers_1 = require("ethers");
const providers_1 = require("../utils/providers");
const chains_1 = require("../config/chains");
const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function name() view returns (string)"
];
async function getBalance(address, tokenAddress) {
    let total = 0n;
    const breakdown = {};
    let tokenName = "ETH"; // Default for native token
    for (const chain of chains_1.defaultChains) {
        try {
            const provider = (0, providers_1.getProvider)(chain.rpcUrl);
            if (!tokenAddress) {
                // Native token (e.g. ETH, MATIC, etc.)
                const balance = await provider.getBalance(address);
                total += balance;
                breakdown[chain.name] = (0, ethers_1.formatUnits)(balance, 18);
            }
            else {
                const token = new ethers_1.Contract(tokenAddress, ERC20_ABI, provider);
                const balance = await token.balanceOf(address);
                const decimals = await token.decimals();
                // Only fetch name once
                if (tokenName === "ETH") {
                    try {
                        tokenName = await token.name();
                    }
                    catch (nameErr) {
                        console.warn(`Could not fetch token name on ${chain.name}`, nameErr);
                        tokenName = "Unknown Token";
                    }
                }
                total += balance;
                breakdown[chain.name] = (0, ethers_1.formatUnits)(balance, decimals);
            }
        }
        catch (err) {
            breakdown[chain.name] = "Error";
            console.warn(`Error fetching from ${chain.name}:`, err);
        }
    }
    return {
        total: (0, ethers_1.formatUnits)(total, 18),
        breakdown,
        tokenName
    };
}
//# sourceMappingURL=getBalance.js.map