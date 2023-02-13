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

export interface IBackgroundColors {
  crimson: string;
  red: string;
  fireBrick: string;
  darkRed: string;
  tomato: string;
  orange: string;
  darkOrange: string;
  gold: string;
  yellow: string;
  chartreuseGreen: string;
  lime: string;
  paleGreen: string;
  green: string;
  springGreen: string;
  seaGreen: string;
  forestGreen: string;
  darkSeaGreen: string;
  lightSeaGreen: string;
  teal: string;
  lightCyan: string;
  turquoise: string;
  steelBlue: string;
  skyBlue: string;
  dodgerBlue: string;
  royalBlue: string;
  cyan: string;
  azure: string;
  blue: string;
  navy: string;
  midnightBlue: string;
  stateblue: string;
  mediumStateBlue: string;
  indigo: string;
  violet: string;
  magenta: string;
  rebeccaPurple: string;
  blueViolet: string;
  rose: string;
  wheat: string;
  sandyBrown: string;
  chocolate: string;
  brown: string;
  lightGrey: string;
  silver: string;
  grey: string;
  dimGrey: string;
  black: string;
  white: string;
  purple: string;
}

export type AccountBackgroundColorsKeys = keyof IBackgroundColors;
