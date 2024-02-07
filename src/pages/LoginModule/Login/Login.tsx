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
import { BrandLogoName } from '../../../components/templates';
import {
  Main, LoginCard, LogoContainer, LoginCardActions,
  FormLoginTitle, FormInstructions, LoginInput, ForgotPasswordLink,
} from './Login.styled';
import {
  PrimaryButton, SecondaryButton, AnchorButton,
} from '../../../styles';
import { SystemStateEnum } from '../../../enums';

const Login = () => {
  const { hasSignedOn, navigateToDashboard } = useSyncLoginInfo();
  const {
    handleSubmit, handleShowNotification, notificationInfo, notification, submitOnPressEnter,
    updateTitle, updateDescription, updateStatus,
  } = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (hasSignedOn) {
      // Show user a notification and let him go to the dashboard.
      updateTitle("Oops! Looks like you've signed in already.");
      updateDescription('Redirecting you into the dashboard.');
      updateStatus(SystemStateEnum.Info);
      handleShowNotification();
      setTimeout(() => {
        navigateToDashboard();
      }, 4000);
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
                <LoginCardActions>
                  <AnchorButton to={REGISTER_ROUTE}>
                    <SecondaryButton variant="contained" size="medium">Register</SecondaryButton>
                  </AnchorButton>
                  <PrimaryButton variant="contained" onClick={submitForm} size="medium">Login</PrimaryButton>
                </LoginCardActions>
              </Form>
            )}
          </Formik>
        </LoginCard>
      </Main>
    </>
  );
};

export { Login };
