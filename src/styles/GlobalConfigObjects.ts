import { IGlobalConfiguration } from './interface';

export const AppColors = {
  primary: '#E6991E',
  secondary: '#EAB765',
  white: '#fbfbfb',
  black: '#1D1305',
  positive: '#35E6DB',
  negative: '#E65A12',
  info: '#1ea7fd',
  warning: '#d9f117',
  bgColorLight: '#F5EFE5',
  bgColorDark: '#66440D',
  grey: '#9F9B94',
  subtitleColor: '#B5BFCA',
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
      P: '1.6rem',
      Sub: '1.4rem',
    },
  },
  tablet: {
    fontSizes: {
      H1: '2.4rem',
      H2: '2.2rem',
      H3: '2rem',
      P: '1.6rem',
      Sub: '1.5rem',
    },
  },
  desktop: {
    fontSizes: {
      H1: '3.2rem',
      H2: '2.8rem',
      H3: '2.4rem',
      P: '1.8rem',
      Sub: '1.6rem',
    },
  },
};
