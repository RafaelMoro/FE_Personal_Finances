import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { LOGIN_POST_ROUTE } from '../pages/LoginModule/Login/constants';
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '../pages/LoginModule/constants';
import { ICountOnMeLocalStorage } from '../utils/LocalStorage/interface';
import { ILoginValues } from '../pages/LoginModule/Login/interface';
import { IUser } from '../globalInterface';
import { SystemStateEnum } from '../enums';
import { useNotification } from './useNotification';
import { userAtom } from '../atoms';
import { postRequest } from '../utils/PostRequest.ts';
import { getLocalStorageInfo, updateLocalStorage, saveInfoToLocalStorage } from '../utils';

const NOTIFICATION_TITLE = 'Error';
const NOTIFICATION_DESCRIPTION = '';
const NOTIFICATION_STATUS = SystemStateEnum.Error;

/*
* useLogin manages:
*   - The notification of the Login Page
*   - Update user atom from local storage
*   - handleSubmit function to manage the data when the form in the Login page is submitted.
*
* It returns:
*   - handleSubmit: manages the actions after submitting the form in the Login page
*   - toggleShowNotification: Function that toggles the notification to show it or hide it.
*   - notificationInfo: React ref that has the notification title, description and status.
*   - showNotification: A flag to show or hide the notification component.
*/

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
      navigate(DASHBOARD_ROUTE);
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
      const bearerToken = { Authorization: `Bearer ${accessToken}` };
      const user: IUser = { accessToken, email, bearerToken };
      updateLocalStorage(
        {
          user,
        },
      );
      setUser(user);
      navigate(DASHBOARD_ROUTE);
    }
  };

  const signOut = () => {
    setUser(null);
    saveInfoToLocalStorage({});
    navigate(LOGIN_ROUTE);
  };

  return {
    handleSubmit,
    handleShowNotification: toggleShowNotification,
    signOut,
    notificationInfo,
    showNotification,
  };
};

export { useLogin };
