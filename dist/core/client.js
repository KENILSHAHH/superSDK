"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superSDK = void 0;
const chains_1 = require("../config/chains");
const getAggregatedBalance_1 = require("../methods/getAggregatedBalance");
const sendETH_1 = require("../methods/sendETH");
class superSDK {
    constructor(options) {
        this.chains = options?.chains || chains_1.defaultChains;
    }
    /**
     * Get the balance of either a native token (if no tokenAddress provided)
     * or an ERC-20 token (if tokenAddress is provided), across all configured chains.
     */
    async getBalance(address, tokenAddress) {
        if (!address) {
            throw new Error("Address is required");
        }
        if (tokenAddress && !/^0x[a-fA-F0-9]{40}$/.test(tokenAddress)) {
            throw new Error("Invalid token address");
        }
        if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
            throw new Error("Invalid address");
        }
        return (0, getAggregatedBalance_1.getAggregatedBalance)(address, tokenAddress);
    }
    async sendETH(to, amount, tokenAddress, chainId) {
        const tx = await (0, sendETH_1.sendETH)(to, amount, tokenAddress, chainId);
        return tx;
    }
}
exports.superSDK = superSDK;
//# sourceMappingURL=client.js.map