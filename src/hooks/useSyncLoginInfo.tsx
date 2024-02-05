import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useLogin } from './useLogin';
import { CountOnMeLocalStorage } from '../utils/LocalStorage/interface';
import { getLocalStorageInfo } from '../utils';
import { signOn } from '../redux/slices/User/user.slice';
import { verifyJwtExpiration } from '../utils/verifyJwtExpiration';

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
      const accessToken = user?.accessToken;
      const isExpiredAccessToken = verifyJwtExpiration(accessToken, signOut);
      if (!isExpiredAccessToken) dispatch(signOn(user));
    }
  }, [dispatch, signOut, userReduxState.userInfo]);
};

export { useSyncLoginInfo };
