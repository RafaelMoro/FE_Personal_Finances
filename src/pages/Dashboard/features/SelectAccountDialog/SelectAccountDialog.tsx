import {
  Dialog, List, ListItem, ListItemButton, Divider,
} from '@mui/material';
import { ListAccount } from './SelectAccountDialog.styled';
import { DialogTitleStyled, ListItemTextStyled } from '../../../../styles';
import { IAccount } from '../../../../components/UI/Account/interface';
import { formatNumberToCurrency } from '../../../../utils/FormatNumberToCurrency';

interface AccountDialogProps {
  open: boolean;
  selectedAccount: IAccount;
  accounts: IAccount[];
  onClose: (selectedAccount: IAccount) => void;
}

const SelectAccountDialog = ({
  open, selectedAccount, onClose, accounts,
}: AccountDialogProps) => {
  const selectedAccountId = selectedAccount.id;
  const accountsWithAmountFormatted = accounts.map((account) => {
    const { amount, id } = account;
    if (id === selectedAccountId) {
      return { ...account, amount: formatNumberToCurrency(amount), selected: true };
    }
    return { ...account, amount: formatNumberToCurrency(amount), selected: false };
  });

  const handleClose = () => {
    onClose(selectedAccount);
  };

  const handleAccountClick = (id: number) => {
    const newSelectedAccount = accounts.find((account) => account.id === id);
    const accountToBePassed = newSelectedAccount || accounts[0];
    onClose(accountToBePassed);
  };

  // Missing to add handler to create account
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitleStyled>Choose other account</DialogTitleStyled>
      <List sx={{ pt: 0 }}>
        { accountsWithAmountFormatted.map((account) => (
          <>
            <ListAccount key={account.id} selectedAccount={account?.selected}>
              <ListItemButton onClick={() => handleAccountClick(account.id)}>
                <ListItemTextStyled primary={account.title} />
                <ListItemTextStyled primary={account.amount} />
              </ListItemButton>
            </ListAccount>
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

export { SelectAccountDialog };
