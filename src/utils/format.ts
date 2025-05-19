import { ethers } from "ethers";

export function formatBalance(value: ethers.BigNumberish, decimals: number): string {
  return ethers.formatUnits(value, decimals);
}
