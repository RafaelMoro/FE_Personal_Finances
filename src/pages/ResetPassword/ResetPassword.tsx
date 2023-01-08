import { ReactElement, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { useAtom } from 'jotai';

import { Notification } from '../../components/UI';
import { IResetPasswordValues } from './interface';
import { postRequest } from '../../utils/PostRequest.ts';
import { RESET_PASSWORD_POST_ROUTE, REDIRECT_ROUTE, RESET_PASSWORD_ERROR_REDIRECT } from '../ForgotPassword/constants';
import { showNotificationAtom } from '../../atoms';
import { SystemStateEnum } from '../../enums';
import {
  Main, MainContainer, FormTitle, FormDescription, FormContainer,
} from '../../styles/LoginModule.styled';
import { ResetPasswordSchema } from '../../validationsSchemas/login.schema';
import { PrimaryButton, InputForm } from '../../styles';

const ResetPassword = (): ReactElement => {
  const [showNotification, setShowNotification] = useAtom(showNotificationAtom);
  const notificationInfo = useRef({
    title: 'Password reset successfully',
    description: 'You may login with your new password.',
    status: SystemStateEnum.Success,
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
      notificationInfo.current.title = 'Error';
      notificationInfo.current.description = 'An error ocurred. Please try again re-sending the email to reset your password.';
      notificationInfo.current.status = SystemStateEnum.Error;
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate(RESET_PASSWORD_ERROR_REDIRECT);
      }, 5000);
    } else {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate(REDIRECT_ROUTE);
      }, 5000);
    }
  };

  const toggleShowNotification = () => {
    setShowNotification(!showNotification);
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
