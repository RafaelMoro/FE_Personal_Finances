import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import { AppColors } from '../../../styles';

export const IconButtonBackToTop = styled(IconButton)`
  background-color: ${AppColors.white};
  border: 1px solid ${AppColors.grey};
  position: fixed;
  bottom: 1.6rem;
  left: 1.6rem;

  &:hover {
    background-color: ${AppColors.white};
    border: 1px solid ${AppColors.grey};
  }
`;
