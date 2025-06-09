import { SDKOptions } from "../types";
import { Address } from "viem";
export declare class superSDK {
    private chains;
    constructor(options?: SDKOptions);
    getBalance(address: Address, tokenAddress?: Address): Promise<{
        total: bigint;
        breakdown: Record<string, string>;
        asset: string;
    }>;
    sendETH(to: Address, amount: bigint, tokenAddress: string | undefined, chainId: number): Promise<string | undefined>;
}
//# sourceMappingURL=client.d.ts.map