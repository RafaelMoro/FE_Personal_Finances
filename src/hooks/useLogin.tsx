import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { LOGIN_POST_ROUTE, AFTER_LOGIN_NAVIGATE_ROUTE } from '../pages/Login/constants';
import { ICountOnMeLocalStorage } from '../utils/LocalStorage/interface';
import { ILoginValues } from '../pages/Login/interface';
import { IUser } from '../atoms/interface';
import { SystemStateEnum } from '../enums';
import { useNotification } from './useNotification';
import { userAtom } from '../atoms';
import { postRequest } from '../utils/PostRequest.ts';
import { getLocalStorageInfo, updateLocalStorage } from '../utils';

const NOTIFICATION_TITLE = 'Error';
const NOTIFICATION_DESCRIPTION = '';
const NOTIFICATION_STATUS = SystemStateEnum.Error;

const useLogin = () => {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const {
    showNotification, toggleShowNotification, notificationInfo,
    updateDescription,
  } = useNotification({
    title: NOTIFICATION_TITLE, description: NOTIFICATION_DESCRIPTION, status: NOTIFICATION_STATUS,
  });

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
      updateDescription(errorMessage);
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
    notificationInfo,
    showNotification,
  };
};

export { useLogin };
