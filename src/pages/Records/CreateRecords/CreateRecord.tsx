import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { RecordTemplate } from '../../../components/UI/Records/features/RecordTemplate/RecordTemplate';
import { useNotification } from '../../../hooks/useNotification';
import { Notification } from '../../../components/UI';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { signOn } from '../../../redux/slices/User/user.slice';
import { getLocalStorageInfo } from '../../../utils';
import { CountOnMeLocalStorage, JWT } from '../../../utils/LocalStorage/interface';
import { useLogin } from '../../../hooks/useLogin';

const CreateRecord = () => {
  const {
    globalNotification, toggleGlobalNotification,
  } = useNotification();
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
      const jwtDecoded: JWT = jwtDecode(user?.accessToken);
      // eslint-disable-next-line no-unsafe-optional-chaining
      if (jwtDecoded && Date.now() >= jwtDecoded?.exp * 1000) {
        signOut();
        return;
      }
      dispatch(signOn(user));
    }
  }, [dispatch, signOut, userReduxState.userInfo]);

  return (
    <>
      {globalNotification.showNotification && (
      <Notification
        title={globalNotification.title}
        description={globalNotification.description}
        status={globalNotification.status}
        close={toggleGlobalNotification}
      />
      )}
      <RecordTemplate />
    </>
  );
};

export { CreateRecord };
