const { log, floor, abs, max } = Math;
type num = number;

function breakNum(n: num, threshold: num): [num, num][] {
  let found: [num, num][] = [];
  let size = 0;
  let i = 0;

  while (n >> i != 0) {
    if ((n >> i) % 2 == 0) {
      size++;
    } else {
      if (size >= threshold) {
        const chunk = n & ((1 << i) - 1);
        found.push([chunk, i]);
        n >>= i;
        i = -1; // ie: i=0 due to i++; later
      }

      size = 0;
    }

    i++;
  }

  if (n != 0) {
    found.push([n, Infinity]);
  }

  return found;
}

function spaceOf(n: num) {
  return floor(log(n) / log(2) + 1);
}

function iterateWithin(n: num, space: num): [num, num] {
  // the min space is 3: 1 for single digit + 2 for max growth
  let limit = 1 << max(space - 2, 0);
  let i = 0;

  while (n < limit && n != 1) {
    if (n % 2 == 1) {
      // (3n+1)/2
      n = (n + (n << 1) + 1) >> 1;
    } else {
      n >>= 1;
    }

    i++;
  }

  // to ensure we're below the limit: rolling back one iteration
  // if (n != 1) {
  //   n = ((n << 1) - 1) / 3;
  // }

  // let spaceLeft = limit - n;
  // let sign = Math.sign(spaceLeft);
  // spaceLeft = sign * floor(log(abs(spaceLeft)) / log(2));

  return [n, i];
}

function play(seed: num) {
  const gapSize = 3;
  const uni = breakNum(seed, gapSize); // universe

  while (uni.length != 0) {
    const driver = uni[uni.length - 1];
    const [n0, k] = iterateWithin(...driver);

    // TODO: merge n0 and n1 + propagate merges due to 3^k growth
  }
}

console.log(breakNum(163, 3));
console.log(breakNum(2211, 3));
console.log(breakNum(529, 3));
console.log();

console.log(iterateWithin(27, 7));
