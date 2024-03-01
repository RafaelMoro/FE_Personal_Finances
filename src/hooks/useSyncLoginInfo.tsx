import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useLogin } from './useLogin';
import { CountOnMeLocalStorage } from '../utils/LocalStorage/interface';
import { getLocalStorageInfo } from '../utils';
import { signOn } from '../redux/slices/User/user.slice';
import { verifyJwtExpiration } from '../utils/verifyJwtExpiration';
import { DASHBOARD_ROUTE } from '../pages/RoutesConstants';
import { AnyRecord } from '../globalInterface';

const useSyncLoginInfo = () => {
  const { signOut } = useLogin();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userReduxState = useAppSelector((state) => state.user);
  const [recordToBeEdited, setRecordtoBeEdited] = useState<null | AnyRecord>(null);
  const [isEmptyLocalStorage, setIsEmptyLocalStorage] = useState<boolean>(false);
  const [hasSignedOn, setHasSignedOn] = useState<boolean>(false);

  const navigateToDashboard = () => navigate(DASHBOARD_ROUTE);

  const getDataFromLocalStorage = () => {
    const localStorageInfo: CountOnMeLocalStorage = getLocalStorageInfo();
    const IsEmptyLocalStorage = Object.keys(localStorageInfo).length < 1;

    if (IsEmptyLocalStorage) {
      setIsEmptyLocalStorage(true);
      return null;
    }

    const { accessToken, bearerToken, user } = localStorageInfo;
    return {
      user: { accessToken, bearerToken, user },
      recordToBeEdited: localStorageInfo?.recordToBeEdited,
    };
  };

  useEffect(() => {
    if (!userReduxState.userInfo) {
      const data = getDataFromLocalStorage();
      if (!data) return;

      const { user, recordToBeEdited: dataRecordToBeEdited } = data;
      const { accessToken } = user;
      const isExpiredAccessToken = verifyJwtExpiration(accessToken, signOut);

      if (!isExpiredAccessToken) {
        dispatch(signOn(user));
        setHasSignedOn(true);
      }

      if (dataRecordToBeEdited) setRecordtoBeEdited(dataRecordToBeEdited);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isEmptyLocalStorage,
    hasSignedOn,
    recordToBeEdited,
    navigateToDashboard,
  };
};

export { useSyncLoginInfo };
