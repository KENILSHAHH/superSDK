import { formatUnits } from 'viem';
import  {getBalance}  from './getBalance'; // uses bigint balance
import { defaultChains } from '../config/chains';

export async function getAggregatedBalance(
  address: `0x${string}`,
  tokenAddress?: `0x${string}`
): Promise<{
  total: bigint;
  breakdown: Record<string, string>; // formatted per-chain balance
  asset: string;
}> {
  let totalRaw = 0n;
  const breakdown: Record<string, string> = {};
  let tokenDecimals = 18;
  let assetName = tokenAddress ? '' : 'ETH';

  for (const chain of defaultChains) {
    try {
      const result = await getBalance(address, chain, tokenAddress);

      if (!assetName) assetName = result.asset;

      totalRaw += result.balance;

      // Still show formatted value per chain
      const formatted = formatUnits(result.balance, tokenDecimals);
      breakdown[chain.name] = formatted;
    } catch (err) {
      console.warn(`Error fetching balance on ${chain.name}:`, err);
      breakdown[chain.name] = 'Error';
    }
  }

  return {
    total: totalRaw, // returning as raw bigint
    breakdown,
    asset: assetName,
  };
}