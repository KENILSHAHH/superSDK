"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superSDK = void 0;
const chains_1 = require("../config/chains");
const getAggregatedBalance_1 = require("../methods/getAggregatedBalance");
class superSDK {
    constructor(options) {
        this.chains = options?.chains || chains_1.defaultChains;
    }
    /**
     * Get the balance of either a native token (if no tokenAddress provided)
     * or an ERC-20 token (if tokenAddress is provided), across all configured chains.
     */
    async getBalance(address, tokenAddress) {
        return (0, getAggregatedBalance_1.getBalance)(address, tokenAddress);
    }
}
exports.superSDK = superSDK;
//# sourceMappingURL=client.js.map