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
  const selectedAccountId = selectedAccount._id;
  const accountsWithAmountFormatted = accounts.map((account) => {
    const { amount, _id: id } = account;
    if (id === selectedAccountId) {
      return { ...account, amount: formatNumberToCurrency(amount), selected: true };
    }
    return { ...account, amount: formatNumberToCurrency(amount), selected: false };
  });

  const handleClose = () => {
    onClose(selectedAccount);
  };

  const handleAccountClick = (id: string) => {
    const newSelectedAccount = accounts.find((account) => account._id === id);
    const accountToBePassed = newSelectedAccount || accounts[0];
    onClose(accountToBePassed);
  };

  // Missing to add handler to create account
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitleStyled>Choose other account</DialogTitleStyled>
      <List sx={{ pt: 0 }}>
        { accountsWithAmountFormatted.map((account) => (
          <article key={account._id}>
            <ListAccount selectedAccount={account?.selected}>
              <ListItemButton onClick={() => handleAccountClick(account._id)}>
                <ListItemTextStyled primary={account.title} />
                <ListItemTextStyled primary={account.amount} />
              </ListItemButton>
            </ListAccount>
            <Divider />
          </article>
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
