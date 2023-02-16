import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ListItem } from '@mui/material';
import { AppColors } from '../../../../styles';
import { IListAccountDynamicStylesProps } from './interface';

const ListAccountDynamicStyles = ({ selectedAccount }: IListAccountDynamicStylesProps) => css`
  ${selectedAccount && `background-color: ${AppColors.bgColorGrey};`}
`;

export const ListAccount = styled(ListItem)`
  ${ListAccountDynamicStyles}
`;
