import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { LogoImageContainerProps, LogoTitleLoginProps } from './interface';
import { AppColors } from '../../../styles';
import { appTheme } from '../../../styles/theme';

export const BrandLogoButton = styled.button`
  background-color: inherit;
  border: none;
  display: flex;
  gap: ${appTheme.spacing(2)};
  align-items: center;
  cursor: pointer;
`;

export const LogoImageContainer = styled.picture`
  display: block;
  width: ${(contianerProps: LogoImageContainerProps) => (contianerProps.isLoginPage ? '17rem' : '7rem')};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    ${(props: LogoImageContainerProps) => (props.isLandingPage && 'border-radius: 50%;')}
  }
`;

export const LogoTitleLogin = styled(Typography, { shouldForwardProp: (props) => props !== 'isLandingPage' })`
  font-family: 'Russo One', sans-serif;
  color: ${AppColors.primary};
  ${(props: LogoTitleLoginProps) => (props.isLandingPage && `color: ${AppColors.white}; font-weight: 400;`)}
`;
