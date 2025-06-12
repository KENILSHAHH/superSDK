"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultChains = exports.supersimL2B = exports.supersimL2A = void 0;
const viem_1 = require("viem");
exports.supersimL2A = (0, viem_1.defineChain)({
    id: 901,
    name: "Supersim L2 A",
    nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ["http://127.0.0.1:9545"],
        },
    },
    blockExplorers: {
        default: {
            name: "Supersim L2 A Explorer",
            url: "http://127.0.0.1:4000",
        },
    },
    contracts: {
        opChainProxyAdmin: {},
        addressManager: {},
        l1Erc721BridgeProxy: {},
        systemConfig: {},
        optimismMintableErc20FactoryProxy: {},
        l1StandardBridge: {},
        l1CrossDomainMessenger: {},
        optimismPortal: {},
        disputeGameFactory: {},
        anchorStateRegistry: {},
        faultDisputeGame: {},
        permissionedDisputeGame: {},
        gasPriceOracle: {
            address: "0x420000000000000000000000000000000000000F",
        },
        l1Block: {
            address: "0x4200000000000000000000000000000000000015",
        },
        l2CrossDomainMessenger: {
            address: "0x4200000000000000000000000000000000000007",
        },
        l2Erc721Bridge: {
            address: "0x4200000000000000000000000000000000000014",
        },
        l2StandardBridge: {
            address: "0x4200000000000000000000000000000000000010",
        },
        l2ToL1MessagePasser: {
            address: "0x4200000000000000000000000000000000000016",
        },
    },
    sourceId: 900,
    testnet: true,
});
exports.supersimL2B = (0, viem_1.defineChain)({
    id: 902,
    name: "Supersim L2 B",
    nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ["http://127.0.0.1:9546"],
        },
    },
    blockExplorers: {
        default: {
            name: "Supersim L2 B Explorer",
            url: "http://127.0.0.1:4001",
        },
    },
    contracts: {
        opChainProxyAdmin: {},
        addressManager: {},
        l1Erc721BridgeProxy: {},
        systemConfig: {},
        optimismMintableErc20FactoryProxy: {},
        l1StandardBridge: {},
        l1CrossDomainMessenger: {},
        optimismPortal: {},
        disputeGameFactory: {},
        anchorStateRegistry: {},
        faultDisputeGame: {},
        permissionedDisputeGame: {},
        gasPriceOracle: {
            address: "0x420000000000000000000000000000000000000F",
        },
        l1Block: {
            address: "0x4200000000000000000000000000000000000015",
        },
        l2CrossDomainMessenger: {
            address: "0x4200000000000000000000000000000000000007",
        },
        l2Erc721Bridge: {
            address: "0x4200000000000000000000000000000000000014",
        },
        l2StandardBridge: {
            address: "0x4200000000000000000000000000000000000010",
        },
        l2ToL1MessagePasser: {
            address: "0x4200000000000000000000000000000000000016",
        },
    },
    sourceId: 900,
    testnet: true,
});
exports.defaultChains = [exports.supersimL2A, exports.supersimL2B];
//# sourceMappingURL=chains.js.map