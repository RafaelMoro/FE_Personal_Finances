import { CardContent } from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';

import { SystemStateEnum } from '../../enums';
import { useLogin } from '../../hooks/useLogin';
import { LoginSchema } from '../../validationsSchemas';
import { Notification } from '../../components/UI';
import {
  Main, LoginCard, LogoContainer, LogoImageContainer, LogoTitle, LoginCardActions,
  FormTitle, FormInstructions, LoginInput,
} from './Login.styled';
import { PrimaryButton } from '../../styles/Global.styled';
import logo from '../../assets/logo.png';

const Login = () => {
  const {
    handleSubmit, handleShowNotification, error, showNotification,
  } = useLogin();

  return (
    <>
      {showNotification && (
      <Notification
        title="Error"
        description={error}
        status={SystemStateEnum.Error}
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
                </CardContent>
                <LoginCardActions>
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
