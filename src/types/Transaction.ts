import { Abi, Address } from 'viem';

export type SendTransactionParams = {
  contractAddress: Address;
  chainId: number;
  userAddress: Address;
  functionName: string;
  functionParams: string[];
  abi: Abi;
  value: bigint;
};