import { CardContent } from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';

import { REGISTER_ROUTE } from '../../RoutesConstants';
import { useLogin } from '../../../hooks/useLogin';
import { LoginSchema } from '../../../validationsSchemas';
import { Notification } from '../../../components/UI';
import {
  Main, LoginCard, LogoContainer, LogoImageContainer, LogoTitle, LoginCardActions,
  FormTitle, FormInstructions, LoginInput, ForgotPasswordLink,
} from './Login.styled';
import { PrimaryButton, SecondaryButton, AnchorButton } from '../../../styles';
import logo from '../../../assets/logo.png';

const Login = () => {
  const {
    handleSubmit, handleShowNotification, notificationInfo, notification,
  } = useLogin();

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
          <LogoImageContainer>
            <img src={logo} alt="logo" />
          </LogoImageContainer>
          <LogoTitle>Cuenta conmigo</LogoTitle>
        </LogoContainer>
        <LoginCard>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleSubmit(values)}
            validateOnMount
          >
            {({ submitForm }) => (
              <Form>
                <CardContent>
                  <FormTitle>Welcome back</FormTitle>
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
                    type="password"
                    variant="standard"
                    fullWidth
                    label="Password"
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
