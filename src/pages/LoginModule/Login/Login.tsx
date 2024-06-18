import { CardContent } from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import { useEffect, useState } from 'react';

import { REGISTER_ROUTE } from '../../RoutesConstants';
import { useLogin } from '../../../hooks/useLogin';
import { useSyncLoginInfo } from '../../../hooks/useSyncLoginInfo';
import { LoginSchema } from '../../../validationsSchemas';
import { Notification } from '../../../components/UI';
import { TogglePasswordAdornment } from '../../../components/UI/TogglePasswordAdornment';
import { ActionButtonPanel, BrandLogoName } from '../../../components/templates';
import {
  Main, LoginCard, LogoContainer,
  FormLoginTitle, FormInstructions, LoginInput, ForgotPasswordLink,
} from './Login.styled';
import { useAppSelector } from '../../../redux/hooks';

const Login = () => {
  const { navigateToDashboard } = useSyncLoginInfo();
  const {
    handleSubmit, handleShowNotification, notificationInfo, notification, submitOnPressEnter, loginSuccess, loginLoading,
  } = useLogin();
  const hasSignedOn = useAppSelector((state) => state.userInterface.hasSignedOn);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (hasSignedOn) {
      navigateToDashboard();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSignedOn]);

  return (
    <>
      {notification && (
      <Notification
        title={notificationInfo.current.title}
        description={notificationInfo.current.description}
        status={notificationInfo.current.status}
        close={handleShowNotification}
      />
      )}
      <Main>
        <LogoContainer>
          <BrandLogoName isLoginPage />
        </LogoContainer>
        <LoginCard>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleSubmit(values)}
            validateOnMount
          >
            {({ submitForm }) => (
              <Form
                onKeyDown={(event) => {
                  submitOnPressEnter(event, submitForm);
                }}
              >
                <CardContent>
                  <FormLoginTitle variant="h2">Welcome back</FormLoginTitle>
                  <FormInstructions>Enter your credentials to enter your account.</FormInstructions>
                  <Field
                    component={LoginInput}
                    name="email"
                    type="email"
                    variant="standard"
                    fullWidth
                    label="Email"
                  />
                  <Field
                    component={LoginInput}
                    name="password"
                    type={(showPassword) ? 'text' : 'password'}
                    variant="standard"
                    fullWidth
                    label="Password"
                    InputProps={{
                      endAdornment: <TogglePasswordAdornment showPassword={showPassword} toggleShowPassword={toggleShowPassword} />,
                    }}
                  />
                  <ForgotPasswordLink to="/forgot-password">Do you forgot your password? </ForgotPasswordLink>
                </CardContent>
                <ActionButtonPanel
                  minWidthNumber="12"
                  submitButtonText="Login"
                  actionDataTestId="login-button"
                  submitForm={submitForm}
                  cancelButtonText="Register"
                  routeCancelButton={REGISTER_ROUTE}
                  useSecondaryButton
                  success={loginSuccess}
                  loading={loginLoading}
                  disableSubmitButton={loginSuccess || loginLoading}
                />
              </Form>
            )}
          </Formik>
        </LoginCard>
      </Main>
    </>
  );
};

export { Login };
