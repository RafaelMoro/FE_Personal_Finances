import { Paragraph, PrimaryButton } from '../../../../../styles';
import { NoAccountsFoundContainer, NoAccountsFoundPicture } from './NoAccountsFound.styled';
import noAccountsFoundPng from '../../../../../assets/no_accounts_found_png.png';
import noAccountsFoundWebp from '../../../../../assets/no_accounts_found_webp.webp';
import { useAccountsActions } from '../../../../../hooks/useAccountsActions';

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
      <Paragraph align="center">
        You have not created accounts yet. Start now!
      </Paragraph>
      <PrimaryButton onClick={handleOpenCreateAccount}>Create account</PrimaryButton>
    </NoAccountsFoundContainer>
  );
};

export { NoAccountsFound };
