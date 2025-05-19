export {}; // This makes the file a module

declare global {
  interface Window {
    ethereum?: any; // You can replace `any` with a more specific type if available
  }
}