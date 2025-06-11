

import { Chain } from "viem";
import { defineChain } from 'viem'

export declare const supersimL2A: {
  blockExplorers?: {
      [key: string]: {
          name: string;
          url: string;
          apiUrl?: string | undefined;
      };
      default: {
          name: string;
          url: string;
          apiUrl?: string | undefined;
      };
  } | undefined;
  contracts: {
      readonly opChainProxyAdmin: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly addressManager: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly l1Erc721BridgeProxy: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly systemConfig: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly optimismMintableErc20FactoryProxy: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly l1StandardBridge: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly l1CrossDomainMessenger: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly optimismPortal: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly disputeGameFactory: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly anchorStateRegistry: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly faultDisputeGame: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly permissionedDisputeGame: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
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
  readonly formatters: {
      readonly block: {
          exclude: [] | undefined;
          format: (args: import("viem/op-stack").OpStackRpcBlock<import("viem").BlockTag, boolean>) => {
              baseFeePerGas: bigint | null;
              blobGasUsed: bigint;
              difficulty: bigint;
              excessBlobGas: bigint;
              extraData: `0x${string}`;
              gasLimit: bigint;
              gasUsed: bigint;
              hash: `0x${string}` | null;
              logsBloom: `0x${string}` | null;
              miner: `0x${string}`;
              mixHash: `0x${string}`;
              nonce: `0x${string}` | null;
              number: bigint | null;
              parentHash: `0x${string}`;
              receiptsRoot: `0x${string}`;
              sealFields: `0x${string}`[];
              sha3Uncles: `0x${string}`;
              size: bigint;
              stateRoot: `0x${string}`;
              timestamp: bigint;
              totalDifficulty: bigint | null;
              transactions: `0x${string}`[] | import("viem/op-stack").OpStackTransaction<boolean>[];
              transactionsRoot: `0x${string}`;
              uncles: `0x${string}`[];
              withdrawals?: import("viem").Withdrawal[] | undefined;
              withdrawalsRoot?: `0x${string}` | undefined;
          };
          type: "block";
      };
      readonly transaction: {
          exclude: [] | undefined;
          format: (args: import("viem/op-stack").OpStackRpcTransaction<boolean>) => {
              blockHash: `0x${string}` | null;
              blockNumber: bigint | null;
              from: `0x${string}`;
              gas: bigint;
              hash: `0x${string}`;
              input: `0x${string}`;
              nonce: number;
              r: `0x${string}`;
              s: `0x${string}`;
              to: `0x${string}` | null;
              transactionIndex: number | null;
              typeHex: `0x${string}` | null;
              v: bigint;
              value: bigint;
              yParity: number;
              gasPrice?: undefined;
              maxFeePerBlobGas?: undefined;
              maxFeePerGas: bigint;
              maxPriorityFeePerGas: bigint;
              isSystemTx?: boolean | undefined;
              mint?: bigint | undefined;
              sourceHash: `0x${string}`;
              type: "deposit";
          } | {
              r: `0x${string}`;
              s: `0x${string}`;
              v: bigint;
              to: `0x${string}` | null;
              from: `0x${string}`;
              gas: bigint;
              nonce: number;
              value: bigint;
              blockHash: `0x${string}` | null;
              blockNumber: bigint | null;
              hash: `0x${string}`;
              input: `0x${string}`;
              transactionIndex: number | null;
              typeHex: `0x${string}` | null;
              accessList?: undefined;
              blobVersionedHashes?: undefined;
              chainId?: number | undefined;
              yParity?: undefined;
              type: "legacy";
              gasPrice: bigint;
              maxFeePerBlobGas?: undefined;
              maxFeePerGas?: undefined;
              maxPriorityFeePerGas?: undefined;
              isSystemTx?: undefined;
              mint?: undefined;
              sourceHash?: undefined;
          } | {
              blockHash: `0x${string}` | null;
              blockNumber: bigint | null;
              from: `0x${string}`;
              gas: bigint;
              hash: `0x${string}`;
              input: `0x${string}`;
              nonce: number;
              r: `0x${string}`;
              s: `0x${string}`;
              to: `0x${string}` | null;
              transactionIndex: number | null;
              typeHex: `0x${string}` | null;
              v: bigint;
              value: bigint;
              yParity: number;
              accessList: import("viem").AccessList;
              blobVersionedHashes?: undefined;
              chainId: number;
              type: "eip2930";
              gasPrice: bigint;
              maxFeePerBlobGas?: undefined;
              maxFeePerGas?: undefined;
              maxPriorityFeePerGas?: undefined;
              isSystemTx?: undefined;
              mint?: undefined;
              sourceHash?: undefined;
          } | {
              blockHash: `0x${string}` | null;
              blockNumber: bigint | null;
              from: `0x${string}`;
              gas: bigint;
              hash: `0x${string}`;
              input: `0x${string}`;
              nonce: number;
              r: `0x${string}`;
              s: `0x${string}`;
              to: `0x${string}` | null;
              transactionIndex: number | null;
              typeHex: `0x${string}` | null;
              v: bigint;
              value: bigint;
              yParity: number;
              accessList: import("viem").AccessList;
              blobVersionedHashes?: undefined;
              chainId: number;
              type: "eip1559";
              gasPrice?: undefined;
              maxFeePerBlobGas?: undefined;
              maxFeePerGas: bigint;
              maxPriorityFeePerGas: bigint;
              isSystemTx?: undefined;
              mint?: undefined;
              sourceHash?: undefined;
          } | {
              blockHash: `0x${string}` | null;
              blockNumber: bigint | null;
              from: `0x${string}`;
              gas: bigint;
              hash: `0x${string}`;
              input: `0x${string}`;
              nonce: number;
              r: `0x${string}`;
              s: `0x${string}`;
              to: `0x${string}` | null;
              transactionIndex: number | null;
              typeHex: `0x${string}` | null;
              v: bigint;
              value: bigint;
              yParity: number;
              accessList: import("viem").AccessList;
              blobVersionedHashes: readonly `0x${string}`[];
              chainId: number;
              type: "eip4844";
              gasPrice?: undefined;
              maxFeePerBlobGas: bigint;
              maxFeePerGas: bigint;
              maxPriorityFeePerGas: bigint;
              isSystemTx?: undefined;
              mint?: undefined;
              sourceHash?: undefined;
          };
          type: "transaction";
      };
      readonly transactionReceipt: {
          exclude: [] | undefined;
          format: (args: import("viem/op-stack").OpStackRpcTransactionReceipt) => {
              blobGasPrice?: bigint | undefined;
              blobGasUsed?: bigint | undefined;
              blockHash: `0x${string}`;
              blockNumber: bigint;
              contractAddress: `0x${string}` | null | undefined;
              cumulativeGasUsed: bigint;
              effectiveGasPrice: bigint;
              from: `0x${string}`;
              gasUsed: bigint;
              logs: import("viem").Log<bigint, number, false, undefined, undefined, undefined, undefined>[];
              logsBloom: `0x${string}`;
              root?: `0x${string}` | undefined;
              status: "success" | "reverted";
              to: `0x${string}` | null;
              transactionHash: `0x${string}`;
              transactionIndex: number;
              type: import("viem").TransactionType;
              l1GasPrice: bigint | null;
              l1GasUsed: bigint | null;
              l1Fee: bigint | null;
              l1FeeScalar: number | null;
          };
          type: "transactionReceipt";
      };
  };
  readonly serializers: {
      readonly transaction: typeof import("viem/op-stack").serializeTransaction;
  };
};
/**
* L2 chain B definition for supersim in non-forked mode
* @category Supersim
*/
export declare const supersimL2B: {
  blockExplorers?: {
      [key: string]: {
          name: string;
          url: string;
          apiUrl?: string | undefined;
      };
      default: {
          name: string;
          url: string;
          apiUrl?: string | undefined;
      };
  } | undefined;
  contracts: {
      readonly opChainProxyAdmin: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly addressManager: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly l1Erc721BridgeProxy: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly systemConfig: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly optimismMintableErc20FactoryProxy: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly l1StandardBridge: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly l1CrossDomainMessenger: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly optimismPortal: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly disputeGameFactory: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly anchorStateRegistry: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly faultDisputeGame: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
      readonly permissionedDisputeGame: {
          [x: number]: {
              address: `0x${string}`;
          };
      };
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
  readonly formatters: {
      readonly block: {
          exclude: [] | undefined;
          format: (args: import("viem/op-stack").OpStackRpcBlock<import("viem").BlockTag, boolean>) => {
              baseFeePerGas: bigint | null;
              blobGasUsed: bigint;
              difficulty: bigint;
              excessBlobGas: bigint;
              extraData: `0x${string}`;
              gasLimit: bigint;
              gasUsed: bigint;
              hash: `0x${string}` | null;
              logsBloom: `0x${string}` | null;
              miner: `0x${string}`;
              mixHash: `0x${string}`;
              nonce: `0x${string}` | null;
              number: bigint | null;
              parentHash: `0x${string}`;
              receiptsRoot: `0x${string}`;
              sealFields: `0x${string}`[];
              sha3Uncles: `0x${string}`;
              size: bigint;
              stateRoot: `0x${string}`;
              timestamp: bigint;
              totalDifficulty: bigint | null;
              transactions: `0x${string}`[] | import("viem/op-stack").OpStackTransaction<boolean>[];
              transactionsRoot: `0x${string}`;
              uncles: `0x${string}`[];
              withdrawals?: import("viem").Withdrawal[] | undefined;
              withdrawalsRoot?: `0x${string}` | undefined;
          };
          type: "block";
      };
      readonly transaction: {
          exclude: [] | undefined;
          format: (args: import("viem/op-stack").OpStackRpcTransaction<boolean>) => {
              blockHash: `0x${string}` | null;
              blockNumber: bigint | null;
              from: `0x${string}`;
              gas: bigint;
              hash: `0x${string}`;
              input: `0x${string}`;
              nonce: number;
              r: `0x${string}`;
              s: `0x${string}`;
              to: `0x${string}` | null;
              transactionIndex: number | null;
              typeHex: `0x${string}` | null;
              v: bigint;
              value: bigint;
              yParity: number;
              gasPrice?: undefined;
              maxFeePerBlobGas?: undefined;
              maxFeePerGas: bigint;
              maxPriorityFeePerGas: bigint;
              isSystemTx?: boolean | undefined;
              mint?: bigint | undefined;
              sourceHash: `0x${string}`;
              type: "deposit";
          } | {
              r: `0x${string}`;
              s: `0x${string}`;
              v: bigint;
              to: `0x${string}` | null;
              from: `0x${string}`;
              gas: bigint;
              nonce: number;
              value: bigint;
              blockHash: `0x${string}` | null;
              blockNumber: bigint | null;
              hash: `0x${string}`;
              input: `0x${string}`;
              transactionIndex: number | null;
              typeHex: `0x${string}` | null;
              accessList?: undefined;
              blobVersionedHashes?: undefined;
              chainId?: number | undefined;
              yParity?: undefined;
              type: "legacy";
              gasPrice: bigint;
              maxFeePerBlobGas?: undefined;
              maxFeePerGas?: undefined;
              maxPriorityFeePerGas?: undefined;
              isSystemTx?: undefined;
              mint?: undefined;
              sourceHash?: undefined;
          } | {
              blockHash: `0x${string}` | null;
              blockNumber: bigint | null;
              from: `0x${string}`;
              gas: bigint;
              hash: `0x${string}`;
              input: `0x${string}`;
              nonce: number;
              r: `0x${string}`;
              s: `0x${string}`;
              to: `0x${string}` | null;
              transactionIndex: number | null;
              typeHex: `0x${string}` | null;
              v: bigint;
              value: bigint;
              yParity: number;
              accessList: import("viem").AccessList;
              blobVersionedHashes?: undefined;
              chainId: number;
              type: "eip2930";
              gasPrice: bigint;
              maxFeePerBlobGas?: undefined;
              maxFeePerGas?: undefined;
              maxPriorityFeePerGas?: undefined;
              isSystemTx?: undefined;
              mint?: undefined;
              sourceHash?: undefined;
          } | {
              blockHash: `0x${string}` | null;
              blockNumber: bigint | null;
              from: `0x${string}`;
              gas: bigint;
              hash: `0x${string}`;
              input: `0x${string}`;
              nonce: number;
              r: `0x${string}`;
              s: `0x${string}`;
              to: `0x${string}` | null;
              transactionIndex: number | null;
              typeHex: `0x${string}` | null;
              v: bigint;
              value: bigint;
              yParity: number;
              accessList: import("viem").AccessList;
              blobVersionedHashes?: undefined;
              chainId: number;
              type: "eip1559";
              gasPrice?: undefined;
              maxFeePerBlobGas?: undefined;
              maxFeePerGas: bigint;
              maxPriorityFeePerGas: bigint;
              isSystemTx?: undefined;
              mint?: undefined;
              sourceHash?: undefined;
          } | {
              blockHash: `0x${string}` | null;
              blockNumber: bigint | null;
              from: `0x${string}`;
              gas: bigint;
              hash: `0x${string}`;
              input: `0x${string}`;
              nonce: number;
              r: `0x${string}`;
              s: `0x${string}`;
              to: `0x${string}` | null;
              transactionIndex: number | null;
              typeHex: `0x${string}` | null;
              v: bigint;
              value: bigint;
              yParity: number;
              accessList: import("viem").AccessList;
              blobVersionedHashes: readonly `0x${string}`[];
              chainId: number;
              type: "eip4844";
              gasPrice?: undefined;
              maxFeePerBlobGas: bigint;
              maxFeePerGas: bigint;
              maxPriorityFeePerGas: bigint;
              isSystemTx?: undefined;
              mint?: undefined;
              sourceHash?: undefined;
          };
          type: "transaction";
      };
      readonly transactionReceipt: {
          exclude: [] | undefined;
          format: (args: import("viem/op-stack").OpStackRpcTransactionReceipt) => {
              blobGasPrice?: bigint | undefined;
              blobGasUsed?: bigint | undefined;
              blockHash: `0x${string}`;
              blockNumber: bigint;
              contractAddress: `0x${string}` | null | undefined;
              cumulativeGasUsed: bigint;
              effectiveGasPrice: bigint;
              from: `0x${string}`;
              gasUsed: bigint;
              logs: import("viem").Log<bigint, number, false, undefined, undefined, undefined, undefined>[];
              logsBloom: `0x${string}`;
              root?: `0x${string}` | undefined;
              status: "success" | "reverted";
              to: `0x${string}` | null;
              transactionHash: `0x${string}`;
              transactionIndex: number;
              type: import("viem").TransactionType;
              l1GasPrice: bigint | null;
              l1GasUsed: bigint | null;
              l1Fee: bigint | null;
              l1FeeScalar: number | null;
          };
          type: "transactionReceipt";
      };
  };
  readonly serializers: {
      readonly transaction: typeof import("viem/op-stack").serializeTransaction;
  };
};




export const defaultChains: Chain[] = [
supersimL2A, supersimL2B
];
