import { createWalletClient, createPublicClient, custom, Address, parseAbi, Abi } from 'viem';
import { defaultChains } from "../config/chains";
import { getAggregatedBalance } from './getAggregatedBalance';
import { sendETH } from './sendETH';
import { SendTransactionParams } from '../types/Transaction';
import { switchChain } from 'viem/_types/actions/wallet/switchChain';
import { switchChains } from '../utils/changeChains';


export async function sendTransaction({
    contractAddress,
    chainId,
    userAddress,
    functionName,
    functionParams,
    abi,
    value
  }: SendTransactionParams): Promise<string> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Ethereum provider found');
  }

  const destinationChain = defaultChains.find(c => c.id === chainId);
  if (!destinationChain) {
    throw new Error(`Chain with id ${chainId} not found`);
  }
  const currentChainHex = await window.ethereum.request({ method: 'eth_chainId' });
    const currentChainId = parseInt(currentChainHex as string, 16);
    const switchWalletClient = createWalletClient({
        chain: destinationChain,
        transport: custom(window.ethereum),
      });
    if (currentChainId !== chainId) {
        await switchChains(destinationChain, switchWalletClient)
    }
  const publicClient = createPublicClient({
    chain: destinationChain,
    transport: custom(window.ethereum),
  });
  
 
    
  const simulation = await publicClient.simulateContract({
    address: contractAddress,
    abi,
    functionName,
    args: functionParams,
    account: userAddress,
    value: value ?? 0n,
  });

  const requiredETH = simulation.request.value ?? 0n;

  const aggregated = await getAggregatedBalance(userAddress);
  if (aggregated.total < requiredETH) {
    throw new Error("Insufficient aggregated ETH balance");
  }

  if (requiredETH > 0n) {
      const bridgetx = await sendETH(userAddress, requiredETH, chainId);
      
  }

  const walletClient = createWalletClient({
    chain: destinationChain,
    transport: custom(window.ethereum),
  });

  const txHash = await walletClient.sendTransaction({
    ...simulation.request,
    to: contractAddress,
  });
  return `${destinationChain.blockExplorers?.default.url}/tx/${txHash}`;
}
