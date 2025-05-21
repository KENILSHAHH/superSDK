export async function getConnectedWallet(): Promise<`0x${string}` | null> {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('MetaMask is not installed!');
      return null;
    }
  
    try {
      // Check if already connected
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  
      if (accounts.length > 0) {
        return accounts[0] as `0x${string}`;
      }
      const requested = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return requested[0] as `0x${string}`;
    } catch (err) {
      console.error('Wallet connection error:', err);
      alert('Could not connect to wallet');
      return null;
    }
  }