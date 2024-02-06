import { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';

import { AxiosError } from 'axios';
import { Notification } from '../../../components/UI';
import { ResetPasswordFormValues, ResetPasswordValues } from './interface';
import { RESET_PASSWORD_POST_ROUTE } from './constants';
import { LOGIN_ROUTE, FORGOT_PASSWORD_ROUTE } from '../../RoutesConstants';
import { useNotification } from '../../../hooks/useNotification';
import { SystemStateEnum } from '../../../enums';
import {
  Main, MainContainer, FormTitle, FormDescription, FormContainer,
} from '../../../styles/LoginModule.styled';
import { ResetPasswordSchema } from '../../../validationsSchemas/login.schema';
import { PrimaryButton, InputForm, AppColors } from '../../../styles';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { LoadingSpinner } from '../../../components/UI/LoadingSpinner';
import { TickMark } from '../../../components/UI/Icons';
import { resetPasswordThunkFn } from '../../../redux/slices/User/actions/resetPassword';
import { resetSuccessOnAction } from '../../../redux/slices/User/user.slice';

const NOTIFICATION_TITLE = 'Password reset successfully';
const NOTIFICATION_DESCRIPTION = 'You may login with your new password.';
const NOTIFICATION_STATUS = SystemStateEnum.Success;

const NOTIFICATION_ERROR_TITLE = 'Error';
const NOTIFICATION_ERROR_DESCRIPTION = 'An error ocurred. Please try again re-sending the email to reset your password.';
const NOTIFICATION_ERROR_STATUS = SystemStateEnum.Error;

const ResetPassword = (): ReactElement => {
  const {
    notification, toggleShowNotification, notificationInfo,
    updateTitle, updateDescription, updateStatus,
  } = useNotification({
    title: NOTIFICATION_TITLE, description: NOTIFICATION_DESCRIPTION, status: NOTIFICATION_STATUS,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLoadingOnAction = useAppSelector((state) => state.user.loadingOnAction);
  const userSuccessOnAction = useAppSelector((state) => state.user.successOnAction);
  const { pathname } = location;

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    try {
      const { password } = values;
      const valuesRequest: ResetPasswordValues = { password };
      const completeRoute = RESET_PASSWORD_POST_ROUTE + pathname;
      await dispatch(resetPasswordThunkFn({ values: valuesRequest, route: completeRoute }));

      toggleShowNotification();
      setTimeout(() => {
        dispatch(resetSuccessOnAction());
        navigate(LOGIN_ROUTE);
      }, 5000);
    } catch (err) {
      const errorCatched = err as AxiosError;
      // eslint-disable-next-line no-console
      console.error('Error while submitting reset Password: ', errorCatched);
      updateTitle(NOTIFICATION_ERROR_TITLE);
      updateDescription(NOTIFICATION_ERROR_DESCRIPTION);
      updateStatus(NOTIFICATION_ERROR_STATUS);

      toggleShowNotification();
      setTimeout(() => {
        navigate(FORGOT_PASSWORD_ROUTE);
      }, 5000);
    }
  };

  return (
    <>
      {notification && (
        <Notification
          title={notificationInfo.current.title}
          description={notificationInfo.current.description}
          status={notificationInfo.current.status}
          close={toggleShowNotification}
        />
      )}
      <Main>
        <MainContainer>
          <FormTitle variant="h1">Reset Password</FormTitle>
          <FormDescription>
            Enter your new password in the fields below:
          </FormDescription>
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={ResetPasswordSchema}
            onSubmit={(values) => handleSubmit(values)}
            validateOnMount
          >
            {({ submitForm }) => (
              <FormContainer>
                <Field
                  component={InputForm}
                  name="password"
                  type="password"
                  variant="standard"
                  label="New Password"
                />
                <Field
                  component={InputForm}
                  name="confirmPassword"
                  type="password"
                  variant="standard"
                  label="Confirm Password"
                />
                <PrimaryButton variant="contained" onClick={submitForm} size="medium">
                  { (userLoadingOnAction && !userSuccessOnAction) && (<LoadingSpinner />) }
                  { (!userLoadingOnAction && userSuccessOnAction) && (<TickMark fillColor={AppColors.white} />) }
                  { (!userLoadingOnAction && !userSuccessOnAction) && 'Reset Password' }
                </PrimaryButton>
              </FormContainer>
            )}
          </Formik>
        </MainContainer>
      </Main>
    </>
  );
};

export { ResetPassword };
