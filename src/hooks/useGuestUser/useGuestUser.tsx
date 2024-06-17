import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateAccounts } from '../../redux/slices/Accounts/accounts.slice';
import { signOn } from '../../redux/slices/User/user.slice';
import { addToLocalStorage } from '../../utils';
import { useGuestUserMocks } from './useGuestUserMocks';

const useGuestUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userInfo);
  const {
    recordsAmericanExpress, recordsDebitAccount, accounts, guestUser,
  } = useGuestUserMocks();

  const addGuestUser = () => {
    dispatch(signOn(guestUser));
    addToLocalStorage(guestUser);
    dispatch(updateAccounts(accounts));
    addToLocalStorage({ accounts });
  };

  const loadGuestUser = () => {
    dispatch(signOn(guestUser));
    dispatch(updateAccounts(accounts));
    // Load records
  };

  return {
    addGuestUser,
    loadGuestUser,
  };
};

export { useGuestUser };
