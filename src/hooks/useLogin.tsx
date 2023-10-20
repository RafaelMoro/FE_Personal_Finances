import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { LOGIN_POST_ROUTE } from '../pages/LoginModule/Login/constants';
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '../pages/RoutesConstants';
import { ICountOnMeLocalStorage, JWT } from '../utils/LocalStorage/interface';
import { ILoginValues } from '../pages/LoginModule/Login/interface';
import { User } from '../globalInterface';
import { SystemStateEnum } from '../enums';
import { useNotification } from './useNotification';
import {
  accountsAtom, accountsUIAtom, allRecordsAtom, initialStateAllRecords, selectedAccountAtom, userAtom,
  initialTotalAtomState,
  totalAtom,
} from '../atoms';
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
  const [, setAccounts] = useAtom(accountsAtom);
  const [, setSelectedAccount] = useAtom(selectedAccountAtom);
  const [, setAccountsUI] = useAtom(accountsUIAtom);
  const [, setAllRecords] = useAtom(allRecordsAtom);
  const [, setTotal] = useAtom(totalAtom);
  const {
    toggleShowNotification, notificationInfo,
    updateDescription, notification,
  } = useNotification({
    title: NOTIFICATION_TITLE, description: NOTIFICATION_DESCRIPTION, status: NOTIFICATION_STATUS,
  });

  const signOut = () => {
    // Reset atoms after sign out.
    setUser(null);
    setAccounts(null);
    setAccountsUI([]);
    setSelectedAccount(null);
    setAllRecords(initialStateAllRecords);
    setTotal(initialTotalAtomState);
    saveInfoToLocalStorage({});
    navigate(LOGIN_ROUTE);
  };

  useEffect(() => {
    const localStorageInfo: ICountOnMeLocalStorage = getLocalStorageInfo();
    const IsEmptyLocalStorage = Object.keys(localStorageInfo).length < 1;

    if (!IsEmptyLocalStorage) {
      // Check if token has expired
      const { user } = localStorageInfo;

      const jwtDecoded: JWT = jwtDecode(user?.accessToken);
      // eslint-disable-next-line no-unsafe-optional-chaining
      if (jwtDecoded && Date.now() >= jwtDecoded?.exp * 1000) {
        signOut();
        return;
      }

      setUser(user);
      navigate(DASHBOARD_ROUTE);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const user: User = { accessToken, email, bearerToken };
      updateLocalStorage(
        {
          user,
        },
      );
      setUser(user);
      navigate(DASHBOARD_ROUTE);
    }
  };

  const submitOnPressEnter = (
    event: React.KeyboardEvent<HTMLFormElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (() => Promise<void>) & (() => Promise<any>),
  ) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return {
    handleSubmit,
    handleShowNotification: toggleShowNotification,
    signOut,
    notificationInfo,
    notification,
    submitOnPressEnter,
  };
};

export { useLogin };
