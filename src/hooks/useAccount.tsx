import { CreateAccount } from '../components/UI/Account/interface';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateAccounts, updateAccountsLocalStorage } from '../redux/slices/Accounts/accounts.slice';
import { addToLocalStorage, formatAccountsForLocalStorage, formatSingleAccount } from '../utils';

const useAccount = () => {
  const dispatch = useAppDispatch();
  const accountsLocalStorage = useAppSelector((state) => state.accounts.accountsLocalStorage);
  const accountsUI = useAppSelector((state) => state.accounts.accounts);

  const createAccountGuestUser = (createAccountValues: CreateAccount) => {
    const formattedAccount = formatAccountsForLocalStorage(createAccountValues);
    const newAccountUI = formatSingleAccount(formattedAccount);

    if (accountsUI && accountsLocalStorage) {
      const newAccountsUI = [...accountsUI, newAccountUI];
      const newAccounts = [...accountsLocalStorage, formattedAccount];
      addToLocalStorage({ newInfo: newAccounts, prop: 'accounts' });
      dispatch(updateAccounts(newAccountsUI));
      dispatch(updateAccountsLocalStorage(newAccounts));
    }
  };

  return {
    createAccountGuestUser,
  };
};

export { useAccount };
