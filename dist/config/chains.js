"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultChains = void 0;
const interopAlpha_1 = require("@eth-optimism/viem/src/chains/interopAlpha");
const viem_1 = require("viem");
const supersim0 = (0, viem_1.defineChain)({
    id: 901,
    name: 'supersim0',
    rpcUrls: {
        default: {
            http: ['http://127.0.0.1:9545'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Local 901 Block Explorer',
            url: '',
        },
        routescan: {
            name: 'Local 901 Routescan',
            url: '',
        },
    },
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    sourceId: 901,
    testnet: true,
    contracts: {},
});
const supersim1 = (0, viem_1.defineChain)({
    id: 902,
    name: 'supersim1',
    rpcUrls: {
        default: {
            http: ['http://127.0.0.1:9546'],
        },
    },
    blockExplorers: {
        default: {
            name: 'supersim1 Block Explorer',
            url: '',
        },
        routescan: {
            name: 'supersim1 Routescan',
            url: '',
        },
    },
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    sourceId: 901,
    testnet: true,
    contracts: {},
});
exports.defaultChains = [
    interopAlpha_1.interopAlpha0, interopAlpha_1.interopAlpha1
];
//# sourceMappingURL=chains.js.map