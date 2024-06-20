import { useNavigate } from 'react-router-dom';

import { DASHBOARD_ROUTE, LANDING_ROUTE } from '../pages/RoutesConstants';
import { LoginValues } from '../pages/LoginModule/Login/interface';
import { SystemStateEnum } from '../enums';
import { useNotification } from './useNotification';
import { addToLocalStorage, saveInfoToLocalStorage } from '../utils';
import { useAppDispatch } from '../redux/hooks';
import {
  signOff, signOn,
} from '../redux/slices/User/user.slice';
import { resetAccounts, resetSelectedAccount } from '../redux/slices/Accounts/accounts.slice';
import { ERROR_MESSAGE_GENERAL, ERROR_MESSAGE_UNAUTHORIZED, UNAUTHORIZED_ERROR } from '../constants';
import { resetTotalBalanceRecords } from '../redux/slices/Records/records.slice';
import { useLoginMutation } from '../redux/budgetMaster.api';
import { LOGIN_FIXED_CACHED_KEY } from '../redux/constants';
import { GeneralError } from '../globalInterface';
import { toggleSignedOn } from '../redux/slices/userInterface.slice';

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
  const [loginMutation, { isLoading, isSuccess, reset: resetLoginIn }] = useLoginMutation({
    fixedCacheKey: LOGIN_FIXED_CACHED_KEY,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    toggleShowNotification, notificationInfo, updateTitle,
    updateDescription, updateStatus, notification,
  } = useNotification({
    title: NOTIFICATION_TITLE, description: NOTIFICATION_DESCRIPTION, status: NOTIFICATION_STATUS,
  });

  const signOut = () => {
    // Reset redux state and local storage after sign out.
    dispatch(signOff());
    dispatch(resetAccounts());
    dispatch(resetSelectedAccount());
    dispatch(resetTotalBalanceRecords());
    dispatch(toggleSignedOn());
    saveInfoToLocalStorage({});
    resetLoginIn();
    navigate(LANDING_ROUTE);
  };

  const handleSubmit = async (values: LoginValues) => {
    try {
      // First reset local storage if we have guest user logged in.
      saveInfoToLocalStorage({});

      const user = await loginMutation({ values }).unwrap();
      // Save user on redux state of userInfo
      dispatch(signOn(user));
      dispatch(toggleSignedOn());
      addToLocalStorage({ newInfo: user });
      setTimeout(() => {
        navigate(DASHBOARD_ROUTE);
      }, 3000);
    } catch (err) {
      const error = err as GeneralError;
      // eslint-disable-next-line no-console
      console.error('Error while logging in:', error);
      const message = error?.data?.error?.message;
      if (message === UNAUTHORIZED_ERROR) {
        updateDescription(ERROR_MESSAGE_UNAUTHORIZED);
        toggleShowNotification();
        return;
      }

      updateDescription(ERROR_MESSAGE_GENERAL);
      toggleShowNotification();
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
    loginSuccess: isSuccess,
    loginLoading: isLoading,
    handleSubmit,
    handleShowNotification: toggleShowNotification,
    updateTitle,
    updateDescription,
    updateStatus,
    signOut,
    notificationInfo,
    notification,
    submitOnPressEnter,
  };
};

export { useLogin };
