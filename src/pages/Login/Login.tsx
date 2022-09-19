import { useState } from 'react';
import { CardContent } from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import { useAtom } from 'jotai';

import {
  Main, LoginCard, LogoContainer, LogoImageContainer, LogoTitle, LoginCardActions,
  FormTitle, FormInstructions, LoginInput,
} from './Login.styled';
import { PrimaryButton } from '../../styles/Global.styled';
import logo from '../../assets/logo.png';
import { LoginSchema } from '../../validationsSchemas';
import { loginUserRequest } from './Login.request';
import { ILoginUserInfo } from './interface';
import { accessTokenAtom } from '../../atoms';
import { updateLocalStorage } from '../../utils';
import { Notification } from '../../components/UI';
import { SystemStateEnum } from '../../enums';

const Login = () => {
  const [error, setError] = useState<string>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [, setAccessToken] = useAtom(accessTokenAtom);

  const handleSubmit = async (values: ILoginUserInfo) => {
    const token = await loginUserRequest(values);
    if (token?.error) {
      const errorMessage = token?.message as string;
      setError(errorMessage);
      setShowNotification(true);
    } else {
      updateLocalStorage({ token });
      setAccessToken(token);
    }
  };

  return (
    <>
      {showNotification && <Notification title="Error" description={error} status={SystemStateEnum.Error} />}
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
