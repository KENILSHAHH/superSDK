import { Abi, Address } from 'viem';

export type SendTransactionParams = {
  contractAddress: Address;
  tokenAddress?: Address;
  amount?: bigint;
  chainId: number;
  userAddress: Address;
  functionName: string;
  functionParams: string[];
  abi: Abi;
  value: bigint;
};