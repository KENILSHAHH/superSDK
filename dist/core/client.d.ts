import { SDKOptions } from "../types";
export declare class superSDK {
    private chains;
    constructor(options?: SDKOptions);
    /**
     * Get the balance of either a native token (if no tokenAddress provided)
     * or an ERC-20 token (if tokenAddress is provided), across all configured chains.
     */
    getBalance(address: string, tokenAddress?: string): Promise<any>;
}
//# sourceMappingURL=client.d.ts.map