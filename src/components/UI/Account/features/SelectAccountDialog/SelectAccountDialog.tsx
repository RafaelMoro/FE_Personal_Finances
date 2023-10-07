import {
  Dialog, List, ListItem as ListAccount, Divider,
} from '@mui/material';
import { useAtom } from 'jotai';

import { AccountUI } from '../../interface';
import { ListAccountSelected, ListItemButtonContainer } from './SelectAccountDialog.styled';
import { DialogTitle, ListItemText } from '../../../../../styles';
import { AccountDialogProps } from './interface';
import { accountsUIAtom, selectedAccountAtom } from '../../../../../atoms/atoms';

const SelectAccountDialog = ({
  open, onClose,
}: AccountDialogProps) => {
  const [accountsUI, setAccountsUI] = useAtom(accountsUIAtom);
  const [, setSelectedAccount] = useAtom(selectedAccountAtom);

  const handleAccountClick = (accountId: string) => {
    const newAccounts: AccountUI[] = accountsUI.map((account) => {
      if (account._id === accountId) {
        const newSelectedAccount = { ...account, selected: true };
        setSelectedAccount(newSelectedAccount);
        return newSelectedAccount;
      }

      return {
        ...account,
        selected: false,
      };
    });
    setAccountsUI(newAccounts);
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Choose other account</DialogTitle>
      <List sx={{ pt: 0 }}>
        { accountsUI.map((account) => (
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
