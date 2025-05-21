import { Address, Chain } from 'viem';
type BalanceResult = {
    asset: string;
    chain: string;
    balance: bigint;
};
export declare function getBalance(address: Address, chain: Chain, tokenAddress?: Address | undefined): Promise<BalanceResult>;
export {};
//# sourceMappingURL=getBalance.d.ts.map