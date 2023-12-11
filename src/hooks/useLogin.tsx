import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '../pages/RoutesConstants';
import { ICountOnMeLocalStorage, JWT } from '../utils/LocalStorage/interface';
import { LoginValues } from '../pages/LoginModule/Login/interface';
import { SystemStateEnum } from '../enums';
import { useNotification } from './useNotification';
import {
  accountsAtom, accountsUIAtom, allRecordsAtom, initialStateAllRecords, selectedAccountAtom, userAtom,
  initialTotalAtomState,
  totalAtom,
} from '../atoms';
import { getLocalStorageInfo, saveInfoToLocalStorage } from '../utils';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginUser, toggleNavigateDashboardFlag } from '../redux/slices/User/user.slice';

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
  const dispatch = useAppDispatch();
  const userReduxState = useAppSelector((state) => state.user);
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

  // After having a success login, the flag of navigate to dashboard will be enabled.
  useEffect(() => {
    if (userReduxState.navigateToDashboard) {
      // After navigating to the dashboard, disable the flag to avoid re-render.
      navigate(DASHBOARD_ROUTE);
      dispatch(toggleNavigateDashboardFlag());
    }
  }, [dispatch, navigate, userReduxState.navigateToDashboard]);

  const handleSubmit = async (values: LoginValues) => dispatch(loginUser(values));

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
