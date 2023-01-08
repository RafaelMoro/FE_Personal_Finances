import { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';

import { Notification } from '../../components/UI';
import { IResetPasswordValues } from './interface';
import { postRequest } from '../../utils/PostRequest.ts';
import { RESET_PASSWORD_POST_ROUTE, REDIRECT_ROUTE, RESET_PASSWORD_ERROR_REDIRECT } from '../ForgotPassword/constants';
import { useNotification } from '../../hooks/useNotification';
import { SystemStateEnum } from '../../enums';
import {
  Main, MainContainer, FormTitle, FormDescription, FormContainer,
} from '../../styles/LoginModule.styled';
import { ResetPasswordSchema } from '../../validationsSchemas/login.schema';
import { PrimaryButton, InputForm } from '../../styles';

const NOTIFICATION_TITLE = 'Password reset successfully';
const NOTIFICATION_DESCRIPTION = 'You may login with your new password.';
const NOTIFICATION_STATUS = SystemStateEnum.Success;

const NOTIFICATION_ERROR_TITLE = 'Error';
const NOTIFICATION_ERROR_DESCRIPTION = 'An error ocurred. Please try again re-sending the email to reset your password.';
const NOTIFICATION_ERROR_STATUS = SystemStateEnum.Error;

const ResetPassword = (): ReactElement => {
  const {
    showNotification, toggleShowNotification, notificationInfo,
    updateTitle, updateDescription, updateStatus,
  } = useNotification({
    title: NOTIFICATION_TITLE, description: NOTIFICATION_DESCRIPTION, status: NOTIFICATION_STATUS,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const handleSubmit = async (values: IResetPasswordValues) => {
    const { password } = values;
    const valuesRequest = { password };
    const completeRoute = RESET_PASSWORD_POST_ROUTE + pathname;
    const responseResetPasswordRequest = await postRequest(valuesRequest, completeRoute);

    if (responseResetPasswordRequest?.error) {
      updateTitle(NOTIFICATION_ERROR_TITLE);
      updateDescription(NOTIFICATION_ERROR_DESCRIPTION);
      updateStatus(NOTIFICATION_ERROR_STATUS);

      toggleShowNotification();
      setTimeout(() => {
        navigate(RESET_PASSWORD_ERROR_REDIRECT);
      }, 5000);
    } else {
      toggleShowNotification();
      setTimeout(() => {
        navigate(REDIRECT_ROUTE);
      }, 5000);
    }
  };

  return (
    <>
      {showNotification && (
        <Notification
          title={notificationInfo.current.title}
          description={notificationInfo.current.description}
          status={notificationInfo.current.status}
          close={toggleShowNotification}
        />
      )}
      <Main>
        <MainContainer>
          <FormTitle>Reset Password</FormTitle>
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
                <PrimaryButton variant="contained" onClick={submitForm} size="medium">Reset Password</PrimaryButton>
              </FormContainer>
            )}
          </Formik>
        </MainContainer>
      </Main>
    </>
  );
};

export { ResetPassword };
