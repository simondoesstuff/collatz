export function inBinary(decimal: number): boolean[] {
    if (decimal === 0) return [false];
    
    let binary: boolean[] = [];
    let n = decimal;

    while (n > 0) {
        binary.push(n % 2 === 1);
        n = Math.floor(n / 2);
    }
    
    // reverse
    binary = binary.reverse();

    return binary;
}

let primeCache = new Map<number, boolean>();
export function isPrime(n: number): boolean {
    if (n === 1) {
        return false;
    }
    
    if (primeCache.has(n)) return primeCache.get(n) as boolean;

    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            primeCache.set(n, false);
            return false
        }
    }

    primeCache.set(n, true);
    return true;
}

export function fitsFamily(n: number, coefficient: number, constant: number): boolean {
    return (n - constant) % coefficient === 0;
}

export function familyInner(n: number, coefficient: number, constant: number): number {
    return (n - constant) / coefficient;
}