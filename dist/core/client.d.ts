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
    sendTransaction(contractAddress: Address, chainId: number, userAddress: Address, functionName: string, functionParams: any[], abi: any, value?: bigint): Promise<string>;
}
//# sourceMappingURL=client.d.ts.map