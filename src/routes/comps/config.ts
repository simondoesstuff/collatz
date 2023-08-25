export interface Config {
  base: boolean,
  prime: boolean,
  isolate: {
    coef: number,
    const: number
    hide: boolean,
    inner: boolean,
  },
  bin: false,
  sort: "base"|"slope"
}


export const defaultConfig: () => Config = () => ({
    base: true,
    prime: false,
    isolate: {
      coef: 1,
      const: 0,
      hide: true,
      inner: false,
    },
    bin: false,
    sort: 'base'
});