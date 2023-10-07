import styled from '@emotion/styled';
import { ListItem, ListItemButton } from '@mui/material';
import { AppColors } from '../../../../../styles';

export const ListAccountSelected = styled(ListItem)`
  background-color: ${AppColors.bgColorGrey};
`;

export const ListItemButtonContainer = styled(ListItemButton)`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
