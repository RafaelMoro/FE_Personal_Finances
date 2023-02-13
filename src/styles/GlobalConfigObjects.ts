import { IGlobalConfiguration, IBackgroundColors } from './interface';

/*
* This file saves colors, breakpoints for responsive web design, font sizes
* for different devices.
*/

export const AppColors = {
  primary: '#E6991E',
  secondary: '#EAB765',
  white: '#fbfbfb',
  black: '#1D1305',
  positive: '#35E6DB',
  negative: '#E65A12',
  negativeDarker: '#a13f0d',
  info: '#1ea7fd',
  warning: '#d9f117',
  bgColorLight: '#F5EFE5',
  bgColorDark: '#66440D',
  grey: '#9F9B94',
  subtitleColor: '#B5BFCA',
};

export const BackgroundColors: IBackgroundColors = {
  crimson: '#DC143C',
  red: '#FF0000',
  fireBrick: '#B22222',
  darkRed: '#8B0000',
  tomato: '#FF6347',
  orange: '#FF8000',
  darkOrange: '#FF8C00',
  gold: '#FFD700',
  yellow: '#FFFF00',
  chartreuseGreen: '#80FF00',
  lime: '#00FF00',
  paleGreen: '#98FB98',
  green: '#008000',
  springGreen: '#00FF7F',
  seaGreen: '#2E8B57',
  forestGreen: '#228B22',
  darkSeaGreen: '#8FBC8B',
  lightSeaGreen: '#20B2AA',
  teal: '#008080',
  lightCyan: '#E0FFFF',
  turquoise: '#40E0D0',
  steelBlue: '#4682B4',
  skyBlue: '#87CEEB',
  dodgerBlue: '#1E90FF',
  royalBlue: '#4169E1',
  cyan: '#00FFFF',
  azure: '#0080FF',
  blue: '#0000FF',
  navy: '#000080',
  midnightBlue: '#191970',
  stateblue: '#6A5ACD',
  mediumStateBlue: '#7B68EE',
  indigo: '#4B0082',
  violet: '#EE82EE',
  magenta: '#FF00FF',
  rebeccaPurple: '#663399',
  blueViolet: '#8A2BE2',
  rose: '#FF0080',
  wheat: '#F5DEB3',
  sandyBrown: '#F4A460',
  chocolate: '#D2691E',
  brown: '#A52A2A',
  lightGrey: '#D3D3D3',
  silver: '#C0C0C0',
  grey: '#808080',
  dimGrey: '#696969',
  black: '#1D1305',
  white: '#fbfbfb',
  purple: '#A020F0',
};

export const ResponsiveBreakpoints = {
  tablet: '480px',
  desktop: '1024px',
};

export const GlobalConfiguration: IGlobalConfiguration = {
  mobile: {
    fontSizes: {
      H1: '2.2rem',
      H2: '2rem',
      H3: '1.7rem',
      H4: '1.7rem',
      P: '1.6rem',
      Sub: '1.4rem',
    },
  },
  tablet: {
    fontSizes: {
      H1: '2.4rem',
      H2: '2.2rem',
      H3: '2rem',
      H4: '2rem',
      P: '1.6rem',
      Sub: '1.5rem',
    },
  },
  desktop: {
    fontSizes: {
      H1: '3.2rem',
      H2: '2.8rem',
      H3: '2.4rem',
      H4: '2.4rem',
      P: '1.8rem',
      Sub: '1.6rem',
    },
  },
};
