export interface Config {
  bases: boolean,
  primes: boolean,
  isolate: {
    coefficient: number,
    constant: number
    hideOrGray: boolean,
    useInner: boolean,
  },
  binary: false
}


export const defaultConfig: () => Config = () => ({
    bases: true,
    primes: false,
    isolate: {
      coefficient: 1,
      constant: 0,
      hideOrGray: true,
      useInner: false,
    },
    binary: false
});