import { IGlobalConfiguration, IBackgroundColors, ITextColors } from './interface';

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
  bgColorGrey: '#dbcaca',
  grey: '#9F9B94',
  subtitleColor: '#B5BFCA',
};

export const TextColors: ITextColors[] = [
  { name: 'black', color: '#1D1305' },
  { name: 'white', color: '#fbfbfb' },
];

export const BackgroundColors: IBackgroundColors [] = [
  { name: 'crimson', color: '#DC143C' },
  { name: 'red', color: '#FF0000' },
  { name: 'fireBrick', color: '#B22222' },
  { name: 'darkRed', color: '#8B0000' },
  { name: 'tomato', color: '#FF6347' },
  { name: 'orange', color: '#FF8000' },
  { name: 'darkOrange', color: '#FF8C00' },
  { name: 'gold', color: '#FFD700' },
  { name: 'yellow', color: '#FFFF00' },
  { name: 'chartreuseGreen', color: '#80FF00' },
  { name: 'lime', color: '#00FF00' },
  { name: 'paleGreen', color: '#98FB98' },
  { name: 'green', color: '#008000' },
  { name: 'springGreen', color: '#00FF7F' },
  { name: 'seaGreen', color: '#2E8B57' },
  { name: 'forestGreen', color: '#228B22' },
  { name: 'darkSeaGreen', color: '#8FBC8B' },
  { name: 'lightSeaGreen', color: '#20B2AA' },
  { name: 'teal', color: '#008080' },
  { name: 'lightCyan', color: '#E0FFFF' },
  { name: 'turquoise', color: '#40E0D0' },
  { name: 'steelBlue', color: '#4682B4' },
  { name: 'skyBlue', color: '#87CEEB' },
  { name: 'dodgerBlue', color: '#1E90FF' },
  { name: 'royalBlue', color: '#4169E1' },
  { name: 'cyan', color: '#00FFFF' },
  { name: 'azure', color: '#0080FF' },
  { name: 'blue', color: '#0000FF' },
  { name: 'navy', color: '#000080' },
  { name: 'midnightBlue', color: '#191970' },
  { name: 'stateblue', color: '#6A5ACD' },
  { name: 'mediumStateBlue', color: '#7B68EE' },
  { name: 'indigo', color: '#4B0082' },
  { name: 'violet', color: '#EE82EE' },
  { name: 'magenta', color: '#FF00FF' },
  { name: 'rebeccaPurple', color: '#663399' },
  { name: 'blueViolet', color: '#8A2BE2' },
  { name: 'rose', color: '#FF0080' },
  { name: 'wheat', color: '#F5DEB3' },
  { name: 'sandyBrown', color: '#F4A460' },
  { name: 'chocolate', color: '#D2691E' },
  { name: 'brown', color: '#A52A2A' },
  { name: 'lightGrey', color: '#D3D3D3' },
  { name: 'silver', color: '#C0C0C0' },
  { name: 'grey', color: '#808080' },
  { name: 'dimGrey', color: '#696969' },
  { name: 'black', color: '#1D1305' },
  { name: 'white', color: '#fbfbfb' },
  { name: 'purple', color: '#A020F0' },
];

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
