import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useLogin } from './useLogin';
import { CountOnMeLocalStorage, JWT } from '../utils/LocalStorage/interface';
import { getLocalStorageInfo } from '../utils';
import { signOn } from '../redux/slices/User/user.slice';

const useSyncLoginInfo = () => {
  const { signOut } = useLogin();
  const dispatch = useAppDispatch();
  const userReduxState = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!userReduxState.userInfo) {
      const localStorageInfo: CountOnMeLocalStorage = getLocalStorageInfo();
      const IsEmptyLocalStorage = Object.keys(localStorageInfo).length < 1;

      if (IsEmptyLocalStorage) {
        signOut();
        return;
      }

      const user = localStorageInfo?.user;
      const jwtDecoded: JWT = jwtDecode(user?.accessToken);
      // eslint-disable-next-line no-unsafe-optional-chaining
      if (jwtDecoded && Date.now() >= jwtDecoded?.exp * 1000) {
        signOut();
        return;
      }
      dispatch(signOn(user));
    }
  }, [dispatch, signOut, userReduxState.userInfo]);
};

export { useSyncLoginInfo };
