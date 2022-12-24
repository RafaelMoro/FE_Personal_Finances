import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import { TextField } from 'formik-mui';
import { Link } from 'react-router-dom';

import { AppColors } from './GlobalConfigObjects';
import { createResponsiveProps } from './createResponsiveProps';

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
  #root {
    position: relative;
    z-index: 1;
  }
  .MuiFormHelperText-root {
    ${createResponsiveProps({ fontSize: 'Sub', important: true })}
  }
`;

export const PrimaryButton = styled(Button)`
  ${createResponsiveProps({ fontSize: 'P' })}
  background-color: ${AppColors.primary};

  &:hover {
    background-color: ${AppColors.bgColorDark};
  }
`;

export const Heading1 = styled.h1`
  ${createResponsiveProps({ fontSize: 'H1', fontWeight: 'bold' })}
`;

export const Heading2 = styled.h2`
  ${createResponsiveProps({ fontSize: 'H2', fontWeight: 'bold' })}
`;

export const Heading3 = styled.h3`
  ${createResponsiveProps({ fontSize: 'H3' })}
`;

export const Paragraph = styled.p`
  ${createResponsiveProps({ fontSize: 'P' })}
`;

export const Anchor = styled(Link)`
  ${createResponsiveProps({ fontSize: 'P' })}
`;

export const InputForm = styled(TextField)`
  input {
    ${createResponsiveProps({ fontSize: 'P' })}
  }
  label {
    ${createResponsiveProps({ fontSize: 'P' })}
  }
`;
