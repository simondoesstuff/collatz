export interface Config {
  colorOdd: boolean,
  prime: boolean,
  isolate: {
    coef: number,
    const: number
    hide: boolean,
    inner: boolean,
  },
  base: 10|2|6,
  sort: "base"|"slope"
}


export const defaultConfig: () => Config = () => ({
    colorOdd: true,
    prime: false,
    isolate: {
      coef: 1,
      const: 0,
      hide: true,
      inner: false,
    },
    base: 10,
    sort: 'base'
});