export function inBinary(decimal: number): boolean[] {
    let binary: boolean[] = [];
    let n = decimal;

    while (n > 0) {
        binary.push(n % 2 === 1);
        n = Math.floor(n / 2);
    }

    return binary;
}

export function isPrime(n: number): boolean {
    if (n === 1) {
        return false;
    }

    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false
        }
    }

    return true;
}