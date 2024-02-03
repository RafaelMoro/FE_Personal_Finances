import { Typography } from '@mui/material';
import { PrimaryButton } from '../../../../../styles';
import { NoAccountsFoundContainer, NoAccountsFoundPicture } from './NoAccountsFound.styled';
import { useAccountsActions } from '../../../../../hooks/useAccountsActions';
import noAccountsFoundPng from '../../../../../assets/no_accounts_found_png.png';
import noAccountsFoundWebp from '../../../../../assets/no_accounts_found_webp.webp';

const NoAccountsFound = () => {
  const {
    handleOpenCreateAccount,
  } = useAccountsActions();

  return (
    <NoAccountsFoundContainer>
      <NoAccountsFoundPicture>
        <source srcSet={noAccountsFoundWebp} type="image/webp" />
        <img src={noAccountsFoundPng} alt="No Accounts Found" />
      </NoAccountsFoundPicture>
      <Typography align="center">
        You have not created accounts yet. Start now!
      </Typography>
      <PrimaryButton onClick={handleOpenCreateAccount}>Create account</PrimaryButton>
    </NoAccountsFoundContainer>
  );
};

export { NoAccountsFound };
