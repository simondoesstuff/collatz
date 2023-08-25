export interface Config {
  bases: boolean,
  primes: boolean,
  isolate: {
    coefficient: number,
    constant: number
    hideOrGray: boolean
  }
}


export const defaultConfig: () => Config = () => ({
    bases: true,
    primes: false,
    isolate: {
      coefficient: 1,
      constant: 0,
      hideOrGray: true
    }
});