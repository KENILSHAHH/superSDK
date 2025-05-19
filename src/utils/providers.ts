import { JsonRpcProvider } from "ethers";

const providerCache: Record<string, JsonRpcProvider> = {};

export function getProvider(rpcUrl: string): JsonRpcProvider {
  if (!providerCache[rpcUrl]) {
    providerCache[rpcUrl] = new JsonRpcProvider(rpcUrl);
  }
  return providerCache[rpcUrl];
}
