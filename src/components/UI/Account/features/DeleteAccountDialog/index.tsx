import {
  Dialog,
} from '@mui/material';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import {
  userAtom, accountsAtom, accountsUIAtom, selectedAccountAtom,
} from '../../../../../atoms';
import { SystemStateEnum } from '../../../../../enums';
import { DeleteAccountDialogProps } from './interface';
import { DELETE_ACCOUNT_ROUTE } from '../../constants';
import { HttpRequestWithBearerToken } from '../../../../../utils/HttpRequestWithBearerToken';
import { AccountDialogContainer, DialogParagraph } from './DeleteAccountDialog.styled';
import {
  DialogTitle, SecondaryButton, CancelButton,
} from '../../../../../styles';

const DeleteAccountDialog = ({
  open, onClose, accountId, accountName, dashboardNotificationFunctions,
}: DeleteAccountDialogProps) => {
  const [user] = useAtom(userAtom);
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [accountsUI, setAccountsUI] = useAtom(accountsUIAtom);
  const [, setSelectedAccount] = useAtom(selectedAccountAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const {
    updateTitle,
    updateDescription,
    updateStatus,
    toggleShowNotification,
  } = dashboardNotificationFunctions;

  const handleSubmit = async () => {
    const valuesSubmitted = { accountId };
    const responseDeleteAccountRequest = await HttpRequestWithBearerToken(
      valuesSubmitted,
      DELETE_ACCOUNT_ROUTE,
      'delete',
      bearerToken,
    );

    if (responseDeleteAccountRequest?.error || !responseDeleteAccountRequest) {
      // Handle error notification
      updateTitle('Delete Account: Error');
      updateDescription('Oops! An error ocurred. Try again later.');
      updateStatus(SystemStateEnum.Error);
      onClose();
      toggleShowNotification();
      return;
    }

    // Update account state
    if (Array.isArray(accounts) && responseDeleteAccountRequest?._id) {
      // Update Account atom
      const newAccounts = accounts.filter((account) => account._id !== accountId);
      setAccounts(newAccounts);

      // Update AccountUI atom
      const newAccountsUI = accountsUI.filter((accountUI) => accountUI._id !== accountId);
      if (newAccountsUI.length > 0) newAccountsUI[0].selected = true;
      setAccountsUI(newAccountsUI);

      // Update Selected account atom
      const newSelectedAccount = newAccountsUI.length === 0 ? null : newAccountsUI[0];
      setSelectedAccount(newSelectedAccount);
    }

    // Show success notification
    updateTitle(`Account ${accountName} deleted`);
    updateStatus(SystemStateEnum.Success);
    onClose();
    toggleShowNotification();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Delete Account</DialogTitle>
      <AccountDialogContainer>
        <DialogParagraph>THERE IS NO WAY OF RECOVERING YOUR ACCOUNT.</DialogParagraph>
        <DialogParagraph>
          Are you sure you want to delete the account
          {' '}
          {accountName}
          ?
        </DialogParagraph>
        <SecondaryButton variant="contained" size="medium" onClick={onClose}>Go Back</SecondaryButton>
        <CancelButton variant="contained" onClick={handleSubmit} size="medium">Delete Account</CancelButton>
      </AccountDialogContainer>
    </Dialog>
  );
};

export { DeleteAccountDialog };