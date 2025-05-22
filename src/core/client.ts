import { defaultChains } from "../config/chains";
import {  SDKOptions } from "../types";
import { getAggregatedBalance } from "../methods/getAggregatedBalance";
import { Address, Chain } from "viem";
import { sendETH } from "../methods/sendETH";
export class superSDK {
  private chains: Chain[];
  constructor(options?: SDKOptions) {
    this.chains = options?.chains || defaultChains;
  }
     
  /**
   * Get the balance of either a native token (if no tokenAddress provided)
   * or an ERC-20 token (if tokenAddress is provided), across all configured chains.
   */
  async getBalance(address: Address, tokenAddress?: Address): Promise<{
    total: bigint;
    breakdown: Record<string, string>; // formatted per-chain balance
    asset: string;
  }> {
    if (!address) {
      throw new Error("Address is required");
    }
    if (tokenAddress && !/^0x[a-fA-F0-9]{40}$/.test(tokenAddress)) {
      throw new Error("Invalid token address");
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      throw new Error("Invalid address");
    }
    return getAggregatedBalance(address, tokenAddress);
  }
  async sendETH(
    to: Address,
    amount: bigint,
    tokenAddress: string | undefined,
    chainId: number
  ): Promise<string | undefined> {
    const tx = await sendETH(to, amount, tokenAddress, chainId);
    return tx;
  }
    

}