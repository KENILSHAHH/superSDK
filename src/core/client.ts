import { defaultChains } from "../config/chains";
import { ChainConfig, SDKOptions } from "../types";
import { getBalance } from "../methods/getAggregatedBalance";

export class superSDK {
  private chains: ChainConfig[];

  constructor(options?: SDKOptions) {
    this.chains = options?.chains || defaultChains;
  }

  /**
   * Get the balance of either a native token (if no tokenAddress provided)
   * or an ERC-20 token (if tokenAddress is provided), across all configured chains.
   */
  async getBalance(address: string, tokenAddress?: string) {
    return getBalance(address, tokenAddress);
  }

}