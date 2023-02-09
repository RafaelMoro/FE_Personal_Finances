export interface FontSizes {
  H1: string,
  H2: string,
  H3: string,
  H4: string,
  P: string,
  Sub: string,
}
export interface IGlobalConfiguration {
  mobile: {
    fontSizes: FontSizes
  },
  tablet: {
    fontSizes: FontSizes
  },
  desktop: {
    fontSizes: FontSizes
  }
}
