import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import { BackToTopContainerProps } from './interface';
import { AppColors } from '../../../styles';

export const IconButtonBackToTop = styled(IconButton, { shouldForwardProp: (props) => props !== 'visible' })`
  background-color: ${AppColors.white};
  border: 1px solid ${AppColors.grey};
  position: fixed;
  display: ${({ visible }: BackToTopContainerProps) => (visible ? 'inline-flex' : 'none')};
  bottom: 1.6rem;
  left: 1.6rem;

  &:hover {
    background-color: ${AppColors.white};
    border: 1px solid ${AppColors.grey};
  }
`;
