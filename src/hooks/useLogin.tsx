import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { ILoginUserInfo } from '../pages/Login/interface';
import { IUser } from '../atoms/interface';
import { userAtom } from '../atoms';
import { loginUserRequest } from '../pages/Login/Login.request';
import { getLocalStorageInfo, updateLocalStorage } from '../utils';
import { ICountOnMeLocalStorage } from '../utils/LocalStorage/interface';

const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const localStorageInfo: ICountOnMeLocalStorage = getLocalStorageInfo();
    const IsEmptyLocalStorage = Object.keys(localStorageInfo).length < 1;

    if (!IsEmptyLocalStorage) {
      const { user } = localStorageInfo;
      setUser(user);
      navigate('/dashboard');
    }
  }, [navigate, setUser]);

  const handleSubmit = async (values: ILoginUserInfo) => {
    const loginInfo = await loginUserRequest(values);

    if (loginInfo?.error) {
      const errorMessage = loginInfo?.message as string;
      setError(errorMessage);
      setShowNotification(true);
    } else {
      const { accessToken, user: { email } } = loginInfo;
      const user: IUser = { accessToken, email };
      updateLocalStorage(
        {
          user,
        },
      );
      setUser(user);
      navigate('/dashboard');
    }
  };

  const handleShowNotification = ():void => {
    setShowNotification(!showNotification);
  };

  return {
    handleSubmit,
    handleShowNotification,
    error,
    showNotification,
  };
};

export { useLogin };
