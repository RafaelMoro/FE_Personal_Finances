import { AddOutlined } from '@mui/icons-material';

import { IAddAccountProps } from '../ViewAccounts/interface';
import { AddAccountContainer } from '../../Account.styled';
import { AppColors, Paragraph } from '../../../../../styles';

const AddAccount = ({ onClick }: IAddAccountProps) => (
  <AddAccountContainer onClick={onClick}>
    <AddOutlined sx={{ fontSize: '4.5rem', fill: AppColors.primary }} />
    <Paragraph>Create Account</Paragraph>
  </AddAccountContainer>
);

export { AddAccount };
