import styled from '@emotion/styled';
import { LogoImageContainerProps } from './interface';
import { AppColors, Heading1, ParagraphTitle } from '../../../styles';

export const LogoImageContainer = styled.picture`
  display: block;
  width: ${(contianerProps: LogoImageContainerProps) => (contianerProps.isLoginPage ? '17rem' : '7rem')};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const LogoTitleLogin = styled(Heading1)`
  font-family: 'Russo One', sans-serif;
  color: ${AppColors.primary};
`;

export const LogoTitleHeader = styled(ParagraphTitle)`
  font-family: 'Russo One', sans-serif;
  color: ${AppColors.primary};
`;
