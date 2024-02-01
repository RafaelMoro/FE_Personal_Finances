import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { LogoImageContainerProps } from './interface';
import { AppColors, ParagraphTitle } from '../../../styles';

export const LogoImageContainer = styled.picture`
  display: block;
  width: ${(contianerProps: LogoImageContainerProps) => (contianerProps.isLoginPage ? '17rem' : '7rem')};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const LogoTitleLogin = styled(Typography)`
  font-family: 'Russo One', sans-serif;
  color: ${AppColors.primary};
`;

export const LogoTitleHeader = styled(ParagraphTitle)`
  font-family: 'Russo One', sans-serif;
  color: ${AppColors.primary};
`;
