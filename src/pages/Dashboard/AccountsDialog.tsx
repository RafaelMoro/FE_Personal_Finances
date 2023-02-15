import {
  Dialog, List, ListItem, ListItemButton, Divider,
} from '@mui/material';
import { DialogTitleStyled, ListItemTextStyled } from '../../styles';
import { IAccount } from '../../components/UI/Account/interface';
import { formatNumberToCurrency } from '../../utils/FormatNumberToCurrency';

interface AccountDialogProps {
  open: boolean;
  selectedAccount: IAccount;
  accounts: IAccount[];
  onClose: (selectedAccount: IAccount) => void;
}

const AccountDialog = ({
  open, selectedAccount, onClose, accounts,
}: AccountDialogProps) => {
  const accountsWithAmountFormatted = accounts.map((account) => {
    const { amount } = account;
    return { ...account, amount: formatNumberToCurrency(amount) };
  });
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
      <DialogTitleStyled>Choose other account</DialogTitleStyled>
      <List sx={{ pt: 0 }}>
        { accountsWithAmountFormatted.map((account) => (
          <>
            <ListItem key={account.id}>
              <ListItemButton onClick={() => handleListItemClick(account.id)}>
                <ListItemTextStyled primary={account.title} />
                <ListItemTextStyled primary={account.amount} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        )) }
        <ListItem>
          <ListItemButton
            autoFocus
          >
            <ListItemTextStyled primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
};

export { AccountDialog };
