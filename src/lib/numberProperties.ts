export function inBase(n: number, base: number): number[] {
    if ( n === 0) return [0];
    
    let baseN: number[] = [];

    while (n > 0) {
        baseN.push(n % base);
        n = Math.floor(n / base);
    }
    
    // reverse
    baseN = baseN.reverse();
    return baseN;
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
    if (!fitsFamily(n, coefficient, constant)) throw new Error("Number does not fit family");
    return (n - constant) / coefficient;
}