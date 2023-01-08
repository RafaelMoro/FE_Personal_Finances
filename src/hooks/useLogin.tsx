import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { LOGIN_POST_ROUTE, AFTER_LOGIN_NAVIGATE_ROUTE } from '../pages/Login/constants';
import { ICountOnMeLocalStorage } from '../utils/LocalStorage/interface';
import { ILoginValues } from '../pages/Login/interface';
import { IUser } from '../atoms/interface';
import { useNotification } from './useNotification';
import { userAtom } from '../atoms';
import { postRequest } from '../utils/PostRequest.ts';
import { getLocalStorageInfo, updateLocalStorage } from '../utils';

const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [, setUser] = useAtom(userAtom);
  const { showNotification, toggleShowNotification } = useNotification();

  useEffect(() => {
    const localStorageInfo: ICountOnMeLocalStorage = getLocalStorageInfo();
    const IsEmptyLocalStorage = Object.keys(localStorageInfo).length < 1;

    if (!IsEmptyLocalStorage) {
      const { user } = localStorageInfo;
      setUser(user);
      navigate(AFTER_LOGIN_NAVIGATE_ROUTE);
    }
  }, [navigate, setUser]);

  const handleSubmit = async (values: ILoginValues) => {
    const loginInfo = await postRequest(values, LOGIN_POST_ROUTE);

    if (loginInfo?.error) {
      const errorMessage = loginInfo?.message as string;
      setError(errorMessage);
      toggleShowNotification();
    } else {
      const { accessToken, user: { email } } = loginInfo;
      const user: IUser = { accessToken, email };
      updateLocalStorage(
        {
          user,
        },
      );
      setUser(user);
      navigate(AFTER_LOGIN_NAVIGATE_ROUTE);
    }
  };

  return {
    handleSubmit,
    handleShowNotification: toggleShowNotification,
    error,
    showNotification,
  };
};

export { useLogin };
