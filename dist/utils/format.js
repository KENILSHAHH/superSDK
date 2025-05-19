"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBalance = formatBalance;
const ethers_1 = require("ethers");
function formatBalance(value, decimals) {
    return ethers_1.ethers.formatUnits(value, decimals);
}
//# sourceMappingURL=format.js.map