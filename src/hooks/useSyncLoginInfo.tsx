import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useLogin } from './useLogin';
import { CountOnMeLocalStorage } from '../utils/LocalStorage/interface';
import { getLocalStorageInfo } from '../utils';
import { signOn } from '../redux/slices/User/user.slice';
import { verifyJwtExpiration } from '../utils/verifyJwtExpiration';
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '../pages/RoutesConstants';

const useSyncLoginInfo = () => {
  const { signOut } = useLogin();
  const location = useLocation();
  const navigate = useNavigate();
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
      if (location.pathname === LOGIN_ROUTE) navigate(DASHBOARD_ROUTE);
    }
  }, [dispatch, location.pathname, navigate, signOut, userReduxState.userInfo]);
};

export { useSyncLoginInfo };
