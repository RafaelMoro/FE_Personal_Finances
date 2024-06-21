import { CreateAccount, ModifyAccountValues } from '../components/UI/Account/interface';
import { Account } from '../globalInterface';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateAccounts, updateAccountsLocalStorage } from '../redux/slices/Accounts/accounts.slice';
import {
  addToLocalStorage, formatAccounts, formatAccountsForLocalStorage, formatSingleAccount,
} from '../utils';

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

  const editAccountGuestUser = (modifyAccountValues: ModifyAccountValues) => {
    // Edit it in redux
    const accountFound = accountsLocalStorage?.find((account) => account._id === modifyAccountValues.accountId);

    if (accountFound && accountsLocalStorage) {
      const { accountId, ...restValues } = modifyAccountValues;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { __v, _id } = accountFound;
      const modifiedAccount: Account = { ...restValues, __v, _id };
      const filteredAccounts = accountsLocalStorage?.filter((account) => account._id !== modifyAccountValues.accountId);
      const newAccounts = [...filteredAccounts, modifiedAccount];

      dispatch(updateAccountsLocalStorage(newAccounts));
      addToLocalStorage({ newInfo: newAccounts, prop: 'accounts' });
      const formattedAccountsUI = formatAccounts({ accounts: newAccounts });
      dispatch(updateAccounts(formattedAccountsUI));
    }
  };

  const deleteAccountLocalStorage = (accountId: string) => {
    if (accountsLocalStorage) {
      const filteredAccounts = accountsLocalStorage?.filter((account) => account._id !== accountId);
      dispatch(updateAccountsLocalStorage(filteredAccounts));
      addToLocalStorage({ newInfo: filteredAccounts, prop: 'accounts' });
      const formattedAccountsUI = formatAccounts({ accounts: filteredAccounts });
      dispatch(updateAccounts(formattedAccountsUI));
    }
  };

  return {
    createAccountGuestUser,
    editAccountGuestUser,
    deleteAccountLocalStorage,
  };
};

export { useAccount };
