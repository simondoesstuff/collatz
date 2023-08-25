export function collatz(n: number): number {
    if (n === 0) return 0;
    else if (n % 2 === 0) {
        return n / 2;
    } else {
        return 3 * n + 1;
    }
}

export const base = {
    current: (n: number): number => {
        if (n === 0) {
            // technically there is no base
            return 0;
        }
        
        while (n % 2 === 0) {
            n /= 2;
        }
        
        return n;
    },
    
    next: (n: number): number => {
        return base.current(collatz(base.current(n)));
    },
}

export const path = {
    normal: (n: number): number[] => {
        let current: number[] = [n];
        
        while (n !== 1 && n !== 0) {
            n = collatz(n);
            current.push(n);
        }
        
        return current;
    },
    
    base: (n: number): number[] => {
        let current: number[] = [n];
        
        while (n !== 1 && n !== 0) {
            n = base.next(n);
            current.push(base.current(n));
        }
        
        return current;
    },
    
    baseGrouped: (n: number): number[][] => {
        const normal = path.normal(n);
        
        // Group elements until they hit a 2n + 1 number, then start a new group
        
        let groups: number[][] = [];
        let currentGroup: number[] = [];
        
        for (let i = 0; i < normal.length; i++) {
            if (normal[i] % 2 === 1) {
                currentGroup.push(normal[i]);
                groups.push(currentGroup);
                currentGroup = [];
            } else {
                currentGroup.push(normal[i]);
            }
        }
        
        return groups;
    },
    
    slope: (n: number): [number, number][] => {
        const baseGrouped = path.baseGrouped(n);
        const slopeMapped: [number, number][] = [];
        
        for (let i = 0; i < baseGrouped.length; i++) {
            let baseA = baseGrouped[i][0];

            let baseB;
            if (i === baseGrouped.length - 1) {
                baseB = baseA;
            } else {
                baseB = baseGrouped[i+1][0];
            }
            
            let slope = (baseB - baseA) / baseA;
            
            for (let n of baseGrouped[i]) {
                slopeMapped.push([n, slope]);
            }
        }
        
        return slopeMapped;
    },
    
    slopeGrouped: (n: number): number[][] => {
        const slope = path.slope(n);
        
        let groups: number[][] = [];
        let currentGroup: number[] = [];
        
        for (let i = 0; i < slope.length; i++) {
            if (slope[i][1] <= 0) {
                groups.push(currentGroup);
                currentGroup = [];
                currentGroup.unshift(slope[i][0]);
            } else {
                currentGroup.unshift(slope[i][0]);
            }
        }
        
        return groups;
    }
}
