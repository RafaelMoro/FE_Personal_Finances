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
  positiveDarker: '#317c77',
  negative: '#E65A12',
  negativeDarker: '#a13f0d',
  info: '#1ea7fd',
  warning: '#d9f117',
  bgColorLight: '#F5EFE5',
  bgColorDark: '#66440D',
  bgColorGrey: '#dbcaca',
  grey: '#9F9B94',
  subtitleColor: '#B5BFCA',
  validationError: '#d32f2f',
};

export const TextColors: ITextColors[] = [
  { name: 'Black', color: '#1D1305' },
  { name: 'White', color: '#fbfbfb' },
];

export const BackgroundColors: IBackgroundColors [] = [
  { name: 'Crimson', color: '#DC143C' },
  { name: 'Red', color: '#FF0000' },
  { name: 'Fire Brick', color: '#B22222' },
  { name: 'Dark Red', color: '#8B0000' },
  { name: 'Tomato', color: '#FF6347' },
  { name: 'Orange', color: '#FF8000' },
  { name: 'Dark Orange', color: '#FF8C00' },
  { name: 'Gold', color: '#FFD700' },
  { name: 'Yellow', color: '#FFFF00' },
  { name: 'Chartreuse Green', color: '#80FF00' },
  { name: 'Lime', color: '#00FF00' },
  { name: 'Pale Green', color: '#98FB98' },
  { name: 'Green', color: '#008000' },
  { name: 'Spring Green', color: '#00FF7F' },
  { name: 'Sea Green', color: '#2E8B57' },
  { name: 'Forest Green', color: '#228B22' },
  { name: 'Dark Sea Green', color: '#8FBC8B' },
  { name: 'Light Sea Green', color: '#20B2AA' },
  { name: 'Teal', color: '#008080' },
  { name: 'Light Cyan', color: '#E0FFFF' },
  { name: 'Turquoise', color: '#40E0D0' },
  { name: 'SteelBlue', color: '#4682B4' },
  { name: 'Sky Blue', color: '#87CEEB' },
  { name: 'Dodger Blue', color: '#1E90FF' },
  { name: 'Royal Blue', color: '#4169E1' },
  { name: 'Cyan', color: '#00FFFF' },
  { name: 'Azure', color: '#0080FF' },
  { name: 'Blue', color: '#0000FF' },
  { name: 'Navy', color: '#000080' },
  { name: 'Midnight Blue', color: '#191970' },
  { name: 'State Blue', color: '#6A5ACD' },
  { name: 'Medium State Blue', color: '#7B68EE' },
  { name: 'Indigo', color: '#4B0082' },
  { name: 'Violet', color: '#EE82EE' },
  { name: 'Magenta', color: '#FF00FF' },
  { name: 'Rebecca Purple', color: '#663399' },
  { name: 'Blue Violet', color: '#8A2BE2' },
  { name: 'Rose', color: '#FF0080' },
  { name: 'Wheat', color: '#F5DEB3' },
  { name: 'Sandy Brown', color: '#F4A460' },
  { name: 'Chocolate', color: '#D2691E' },
  { name: 'Brown', color: '#A52A2A' },
  { name: 'Light Grey', color: '#D3D3D3' },
  { name: 'Silver', color: '#C0C0C0' },
  { name: 'Grey', color: '#808080' },
  { name: 'DimGrey', color: '#696969' },
  { name: 'Black', color: '#1D1305' },
  { name: 'White', color: '#fbfbfb' },
  { name: 'Purple', color: '#A020F0' },
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
