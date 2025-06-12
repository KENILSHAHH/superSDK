import { Chain } from "viem";
export declare const supersimL2A: {
    blockExplorers: {
        readonly default: {
            readonly name: "Supersim L2 A Explorer";
            readonly url: "http://127.0.0.1:4000";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly opChainProxyAdmin: {};
        readonly addressManager: {};
        readonly l1Erc721BridgeProxy: {};
        readonly systemConfig: {};
        readonly optimismMintableErc20FactoryProxy: {};
        readonly l1StandardBridge: {};
        readonly l1CrossDomainMessenger: {};
        readonly optimismPortal: {};
        readonly disputeGameFactory: {};
        readonly anchorStateRegistry: {};
        readonly faultDisputeGame: {};
        readonly permissionedDisputeGame: {};
        readonly gasPriceOracle: {
            readonly address: "0x420000000000000000000000000000000000000F";
        };
        readonly l1Block: {
            readonly address: "0x4200000000000000000000000000000000000015";
        };
        readonly l2CrossDomainMessenger: {
            readonly address: "0x4200000000000000000000000000000000000007";
        };
        readonly l2Erc721Bridge: {
            readonly address: "0x4200000000000000000000000000000000000014";
        };
        readonly l2StandardBridge: {
            readonly address: "0x4200000000000000000000000000000000000010";
        };
        readonly l2ToL1MessagePasser: {
            readonly address: "0x4200000000000000000000000000000000000016";
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 901;
    name: "Supersim L2 A";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["http://127.0.0.1:9545"];
        };
    };
    sourceId: 900;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
};
export declare const supersimL2B: {
    blockExplorers: {
        readonly default: {
            readonly name: "Supersim L2 B Explorer";
            readonly url: "http://127.0.0.1:4001";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly opChainProxyAdmin: {};
        readonly addressManager: {};
        readonly l1Erc721BridgeProxy: {};
        readonly systemConfig: {};
        readonly optimismMintableErc20FactoryProxy: {};
        readonly l1StandardBridge: {};
        readonly l1CrossDomainMessenger: {};
        readonly optimismPortal: {};
        readonly disputeGameFactory: {};
        readonly anchorStateRegistry: {};
        readonly faultDisputeGame: {};
        readonly permissionedDisputeGame: {};
        readonly gasPriceOracle: {
            readonly address: "0x420000000000000000000000000000000000000F";
        };
        readonly l1Block: {
            readonly address: "0x4200000000000000000000000000000000000015";
        };
        readonly l2CrossDomainMessenger: {
            readonly address: "0x4200000000000000000000000000000000000007";
        };
        readonly l2Erc721Bridge: {
            readonly address: "0x4200000000000000000000000000000000000014";
        };
        readonly l2StandardBridge: {
            readonly address: "0x4200000000000000000000000000000000000010";
        };
        readonly l2ToL1MessagePasser: {
            readonly address: "0x4200000000000000000000000000000000000016";
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 902;
    name: "Supersim L2 B";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["http://127.0.0.1:9546"];
        };
    };
    sourceId: 900;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
};
export declare const defaultChains: Chain[];
//# sourceMappingURL=chains.d.ts.map