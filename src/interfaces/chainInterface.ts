interface ChainConfig {
    id: number;
    name: string;
    network: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: {
      default: {
        http: string[];
      };
    };
    blockExplorers: {
      default: {
        name: string;
        url: string;
      };
    };
  }