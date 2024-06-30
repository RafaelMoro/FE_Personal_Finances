import {
  Dialog, List, ListItem as ListAccount, Divider,
} from '@mui/material';

import { AccountUI } from '../../interface';
import { AccountDialogProps } from './interface';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { updateSelectedAccount, updateAccounts } from '../../../../../redux/slices/Accounts/accounts.slice';
import { ListAccountSelected, ListItemButtonContainer } from './SelectAccountDialog.styled';
import { DialogTitle, ListItemText } from '../../../../../styles';
import { useGuestUser } from '../../../../../hooks';

const SelectAccountDialog = ({
  open, onClose,
}: AccountDialogProps) => {
  const dispatch = useAppDispatch();
  const { isGuestUser, loadRecords } = useGuestUser();
  const accountsReduxState = useAppSelector((state) => state.accounts);
  const recordsLocalStorage = useAppSelector((state) => state.records.recordsLocalStorage);
  const accountsUI = accountsReduxState?.accounts;

  const handleAccountClick = (accountId: string) => {
    if (accountsUI) {
      const newAccounts: AccountUI[] = (accountsUI).map((account) => {
        if (account._id === accountId) {
          const newSelectedAccount: AccountUI = { ...account, selected: true };
          dispatch(updateSelectedAccount(newSelectedAccount));
          if (isGuestUser) loadRecords(newSelectedAccount, recordsLocalStorage ?? []);
          return newSelectedAccount;
        }

        return {
          ...account,
          selected: false,
        };
      });
      dispatch(updateAccounts(newAccounts));
      onClose();
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Choose other account</DialogTitle>
      <List sx={{ pt: 0 }}>
        { (accountsUI) && accountsUI.map((account) => (
          <article key={account._id}>
            { (account.selected) && (
              <ListAccountSelected>
                <ListItemButtonContainer onClick={() => handleAccountClick(account._id)}>
                  <ListItemText primary={account.title} />
                  <ListItemText primary={account.amountFormatted} />
                </ListItemButtonContainer>
              </ListAccountSelected>
            ) }
            { (!account.selected) && (
              <ListAccount>
                <ListItemButtonContainer onClick={() => handleAccountClick(account._id)}>
                  <ListItemText primary={account.title} />
                  <ListItemText primary={account.amountFormatted} />
                </ListItemButtonContainer>
              </ListAccount>
            ) }
            <Divider />
          </article>
        )) }
      </List>
    </Dialog>
  );
};

export { SelectAccountDialog };
