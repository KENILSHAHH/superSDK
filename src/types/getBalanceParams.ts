
import { Chain, Address} from "viem"

export type GetBalanceParams = {
    address: Address,
    chain: Chain,
    tokenAddress?: Address | undefined
  }