import { createPublicClient, http, Address, Chain } from 'viem';
import { erc20Abi } from 'viem';


type BalanceResult = {
  asset: string;
  chain: string;
  balance: bigint;  // Now using bigint
};

export async function getBalance(
  address: Address,
  chain: Chain,
  tokenAddress?: Address | undefined
): Promise<BalanceResult> {
  const client = createPublicClient({
    chain,
    transport: http(),
  });

  if (!tokenAddress) {
    // Native ETH balance
    const rawBalance = await client.getBalance({ address });
    return {
      asset: chain.nativeCurrency.symbol,
      chain: chain.name,
      balance: rawBalance, // raw bigint
    };
  } else {
    // ERC20 token balance
    const [rawBalance, symbol] = await Promise.all([
      client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address],
      }) as Promise<bigint>,
      client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'symbol',
      }) as Promise<string>,
    ]);

    return {
      asset: symbol,
      chain: chain.name,
      balance: rawBalance, // raw bigint
    };
  }
}