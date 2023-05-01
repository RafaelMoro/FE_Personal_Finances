import {
  Dialog, List, ListItemButton, ListItem as ListAccount, Divider,
} from '@mui/material';
import { useAtom } from 'jotai';

import { AccountUI } from '../../interface';
import { ListAccountSelected } from './SelectAccountDialog.styled';
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
                <ListItemButton onClick={() => handleAccountClick(account._id)}>
                  <ListItemText primary={account.title} />
                  <ListItemText primary={account.amount} />
                </ListItemButton>
              </ListAccountSelected>
            ) }
            { (!account.selected) && (
              <ListAccount>
                <ListItemButton onClick={() => handleAccountClick(account._id)}>
                  <ListItemText primary={account.title} />
                  <ListItemText primary={account.amount} />
                </ListItemButton>
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
