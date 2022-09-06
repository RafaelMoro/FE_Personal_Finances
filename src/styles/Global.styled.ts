import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button } from '@mui/material';

import { IGlobalConfiguration } from './interface';

export const GlobalStyles = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html {
    font-size: 62.5%;
  }
  body {
    font-family: 'Roboto', sans-serif;
  }
  h1, h2, h3, p {
    line-height: 1.5;
  }
`;

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

export const PrimaryButton = styled(Button)`
  font-size: ${GlobalConfiguration.mobile.fontSizes.P};
  background-color: #E6991E;

  @media (min-width: 480px) {
    font-size: ${GlobalConfiguration.tablet.fontSizes.P};
  }
  @media (min-width: 1024px) {
    font-size: ${GlobalConfiguration.desktop.fontSizes.P};
  }
`;
