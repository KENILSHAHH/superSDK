export function bigintToNumber(value: bigint): number {
  const MAX_SAFE = BigInt(Number.MAX_SAFE_INTEGER);
  if (value > MAX_SAFE) {
    throw new Error(`BigInt value ${value} exceeds safe integer range`);
  }
  return Number(value);
}


export function numberToBigint(value: number): bigint {
  if (!Number.isSafeInteger(value)) {
    throw new Error(`Number ${value} is not a safe integer`);
  }
  return BigInt(value);
}