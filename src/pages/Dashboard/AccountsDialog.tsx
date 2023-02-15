import {
  Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import { IAccount } from '../../components/UI/Account/interface';

interface AccountDialogProps {
  open: boolean;
  selectedAccount: IAccount;
  accounts: IAccount[];
  onClose: (selectedAccount: IAccount) => void;
}

const AccountDialog = ({
  open, selectedAccount, onClose, accounts,
}: AccountDialogProps) => {
  const handleClose = () => {
    onClose(selectedAccount);
  };

  const handleListItemClick = (id: number) => {
    const newSelectedAccount = accounts.find((account) => account.id === id);
    const accountToBePassed = newSelectedAccount || accounts[0];
    onClose(accountToBePassed);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose other account</DialogTitle>
      <List sx={{ pt: 0 }}>
        { accounts.map((account) => (
          <ListItem disableGutters key={account.id}>
            <ListItemButton onClick={() => handleListItemClick(account.id)}>
              <ListItemText primary={account.title} />
              <ListItemText primary={account.amount} />
            </ListItemButton>
          </ListItem>
        )) }
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
          >
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
};

export { AccountDialog };
