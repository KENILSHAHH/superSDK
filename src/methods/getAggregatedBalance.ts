import { Contract, JsonRpcProvider, formatUnits } from "ethers";
import { ChainConfig } from "../types";
import { getProvider } from "../utils/providers";
import {defaultChains} from '../config/chains'

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function name() view returns (string)"
];

export async function getAggregatedBalance(
  address: string,
  tokenAddress?: string | undefined,
): Promise<{
  total: string;
  breakdown: Record<string, string>;
  tokenName: string;
}> {
  let total = 0n;
  const breakdown: Record<string, string> = {};
  let tokenName: string = "ETH"; // Default for native token

  for (const chain of defaultChains) {
    try {
      const provider: JsonRpcProvider = getProvider(chain.rpcUrl);
      if (!tokenAddress) {
        // Native token (e.g. ETH, MATIC, etc.)
        const balance = await provider.getBalance(address);
        total += balance;
        breakdown[chain.name] = formatUnits(balance, 18);
      } else {
        const token = new Contract(tokenAddress, ERC20_ABI, provider);
        const balance: bigint = await token.balanceOf(address);
        const decimals: number = await token.decimals();

        // Only fetch name once
        if (tokenName === "ETH") {
          try {
            tokenName = await token.name();
          } catch (nameErr) {
            console.warn(`Could not fetch token name on ${chain.name}`, nameErr);
            tokenName = "Unknown Token";
          }
        }

        total += balance;
        breakdown[chain.name] = formatUnits(balance, decimals);
      }
    } catch (err) {
      breakdown[chain.name] = "Error";
      console.warn(`Error fetching from ${chain.name}:`, err);
    }
  }

  return {
    total: formatUnits(total, 18),
    breakdown,
    tokenName
  };
}