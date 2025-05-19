"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvider = getProvider;
const ethers_1 = require("ethers");
const providerCache = {};
function getProvider(rpcUrl) {
    if (!providerCache[rpcUrl]) {
        providerCache[rpcUrl] = new ethers_1.JsonRpcProvider(rpcUrl);
    }
    return providerCache[rpcUrl];
}
//# sourceMappingURL=providers.js.map