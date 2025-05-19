
  import { GetBalanceParams,  } from "../types/getBalanceParams"
  export async function getBalance({
    address,
    chain,
    tokenAddress,
  }: GetBalanceParams): Promise<bigint> {
    const client = createPublicClient({
      chain,
      transport: http(),
    })
  
    if (!tokenAddress) {
      // Fetch native ETH balance
      return client.getBalance({ address })
    } else {
      // Fetch ERC20 token balance
      return client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address],
      })
    }
  }