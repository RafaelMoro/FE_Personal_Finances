import { AddOutlined } from '@mui/icons-material';
import { AddAccountContainer } from '../../Account.styled';
import { AppColors, Paragraph } from '../../../../../styles';

const AddAccount = () => (
  <AddAccountContainer>
    <AddOutlined sx={{ fontSize: '4.5rem', fill: AppColors.primary }} />
    <Paragraph>Create Account</Paragraph>
  </AddAccountContainer>
);

export { AddAccount };
