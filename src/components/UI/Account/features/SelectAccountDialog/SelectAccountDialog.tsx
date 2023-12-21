import {
  Dialog, List, ListItem as ListAccount, Divider,
} from '@mui/material';
import { AxiosRequestHeaders } from 'axios';

import { GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE } from '../../../Records/constants';
import { AccountUI } from '../../interface';
import { AccountDialogProps } from './interface';
import { useDate } from '../../../../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { fetchCurrentMonthRecords } from '../../../../../redux/slices/Records/actions/fetchCurrentMonthRecords';
import { updateSelectedAccount, updateAccountsWithNewSelectedAccount } from '../../../../../redux/slices/Accounts/accounts.slice';
import { ListAccountSelected, ListItemButtonContainer } from './SelectAccountDialog.styled';
import { DialogTitle, ListItemText } from '../../../../../styles';

const SelectAccountDialog = ({
  open, onClose,
}: AccountDialogProps) => {
  const dispatch = useAppDispatch();
  const accountsReduxState = useAppSelector((state) => state.accounts);
  const accountsUI = accountsReduxState?.accounts;
  const user = useAppSelector((state) => state.user);
  const bearerToken = user.userInfo?.bearerToken as AxiosRequestHeaders;
  const { month, year } = useDate();

  const handleAccountClick = (accountId: string) => {
    if (accountsUI) {
      const newAccounts: AccountUI[] = (accountsUI).map((account) => {
        if (account._id === accountId) {
          const newSelectedAccount = { ...account, selected: true };
          dispatch(updateSelectedAccount(newSelectedAccount));
          return newSelectedAccount;
        }

        return {
          ...account,
          selected: false,
        };
      });
      dispatch(updateAccountsWithNewSelectedAccount(newAccounts));

      // Fetch records of selected account
      const expensesFullRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${month}/${year}`;
      dispatch(fetchCurrentMonthRecords({ expensesFullRoute, bearerToken }));

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
