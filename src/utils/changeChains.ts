
import { WalletClient, Chain  } from 'viem';


export const switchChains = async (chain: Chain, walletClient: WalletClient) => {
    try {
      await walletClient.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chain.id.toString(16)}` }],
      });
      console.log( `Switched to ${chain.name}`);
    } catch (err : any) {
      if (err.code === 4902) {
        await walletClient.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chain.id.toString(16)}`,
              chainName: `${chain.name}`,
              nativeCurrency: {
                name: `${chain.nativeCurrency.name}`,
                symbol: `${chain.nativeCurrency.name}`,
                decimals: 18,
              },
              rpcUrls: [`${chain.rpcUrls.default.http[0]}`],
              blockExplorerUrls: [`${chain.blockExplorers?.default.url}`],
            },
          ],
        });
        await walletClient.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chain.id.toString(16)}` }],
        });
      } else {
        console.error('Switch chain error:', err);
      }
    }
  };