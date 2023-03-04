import {
  Dialog, List, ListItemButton, Divider,
} from '@mui/material';

import { ListAccount } from './SelectAccountDialog.styled';
import { DialogTitle, ListItemText } from '../../../../../styles';
import { AccountDialogProps } from './interface';
import { formatNumberToCurrency } from '../../../../../utils/FormatNumberToCurrency';

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

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose other account</DialogTitle>
      <List sx={{ pt: 0 }}>
        { accountsWithAmountFormatted.map((account) => (
          <article key={account._id}>
            <ListAccount showSelectedAccount={account.selected}>
              <ListItemButton onClick={() => handleAccountClick(account._id)}>
                <ListItemText primary={account.title} />
                <ListItemText primary={account.amount} />
              </ListItemButton>
            </ListAccount>
            <Divider />
          </article>
        )) }
      </List>
    </Dialog>
  );
};

export { SelectAccountDialog };
