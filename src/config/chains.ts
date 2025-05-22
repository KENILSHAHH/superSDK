
import { interopAlpha0, interopRcAlpha1 } from "@eth-optimism/viem/src/chains";
import { Chain } from "viem";
import { defineChain } from 'viem'

 const supersim0 = defineChain({
  id: 901,
  name: 'Local 901',
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:9545'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Local 901 Block Explorer',
      url: '',
    },
    routescan: {
      name: 'Local 901 Routescan',
      url: '',
    },
},
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  sourceId: 901,
  testnet: true,
  contracts: {},
})

 const supersim1 = defineChain({
  id: 902,
  name: 'supersim0',
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:9546'],
    },
  },
  blockExplorers: {
    default: {
      name: 'supersim1 Block Explorer',
      url: '',
    },
    routescan: {
      name: 'supersim1 Routescan',
      url: '',
    },
  },
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  sourceId : 901,
  testnet: true,
  contracts: {
  },
})


export const defaultChains: Chain[] = [
supersim0, supersim1
];
