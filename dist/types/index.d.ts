import { Chain } from "viem";
export interface SDKOptions {
    chains?: Chain[];
}
export interface EthereumProvider {
    isMetaMask?: boolean;
    request: (args: {
        method: string;
        params?: unknown[];
    }) => Promise<unknown>;
    on?: (event: string, callback: (...args: any[]) => void) => void;
    removeListener?: (event: string, callback: (...args: any[]) => void) => void;
}
//# sourceMappingURL=index.d.ts.map