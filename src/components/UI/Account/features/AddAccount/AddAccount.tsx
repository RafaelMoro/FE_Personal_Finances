import { Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { AddAccountProps } from '../../Account.interface';
import { AddAccountContainer } from '../../Account.styled';
import { AppColors } from '../../../../../styles';

const AddAccount = ({ onClick }: AddAccountProps) => (
  <AddAccountContainer onClick={onClick}>
    <AddOutlined sx={{ fontSize: '4.5rem', fill: AppColors.primary }} />
    <Typography>Create Account</Typography>
  </AddAccountContainer>
);

export { AddAccount };
