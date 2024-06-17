import { Account } from '../../globalInterface';
import { useAppDispatch } from '../../redux/hooks';
import { updateAccounts } from '../../redux/slices/Accounts/accounts.slice';
import { signOn } from '../../redux/slices/User/user.slice';
import { addToLocalStorage, formatAccounts } from '../../utils';
import { useGuestUserMocks } from './useGuestUserMocks';

const useGuestUser = () => {
  const dispatch = useAppDispatch();
  const {
    recordsAmericanExpress, recordsDebitAccount, accounts, guestUser,
  } = useGuestUserMocks();

  const addGuestUser = () => {
    // Add user
    dispatch(signOn(guestUser));
    addToLocalStorage(guestUser);

    // Add accounts
    const accountsUI = formatAccounts({ accounts });
    dispatch(updateAccounts(accountsUI));
    addToLocalStorage({ accounts });
  };

  const loadGuestUser = ({ accountsLocalStorage }: { accountsLocalStorage: Account[] }) => {
    dispatch(signOn(guestUser));
    // Format accounts
    const accountsUI = formatAccounts({ accounts: accountsLocalStorage });
    // Load accounts UI
    dispatch(updateAccounts(accountsUI));
    // Load records
  };

  return {
    addGuestUser,
    loadGuestUser,
  };
};

export { useGuestUser };
