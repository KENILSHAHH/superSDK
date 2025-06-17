"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superSDK = void 0;
const chains_1 = require("../config/chains");
const getAggregatedBalance_1 = require("../methods/getAggregatedBalance");
const sendETH_1 = require("../methods/sendETH");
const sendTransaction_1 = require("../methods/sendTransaction");
class superSDK {
    constructor(options) {
        this.chains = options?.chains || chains_1.defaultChains;
    }
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
        const tx = await (0, sendETH_1.sendETH)(to, amount, chainId);
        return tx;
    }
    async sendTransaction(contractAddress, chainId, userAddress, functionName, functionParams, abi, value) {
        return await (0, sendTransaction_1.sendTransaction)({
            contractAddress,
            chainId,
            userAddress,
            functionName,
            functionParams,
            abi,
            value: value ?? 0n,
        });
    }
}
exports.superSDK = superSDK;
//# sourceMappingURL=client.js.map