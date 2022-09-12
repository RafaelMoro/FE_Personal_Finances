import { CardContent } from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import * as Yup from 'yup';

import {
  Main, LoginCard, LogoContainer, LogoImageContainer, LogoTitle, LoginCardActions,
  FormTitle, FormInstructions, LoginInput,
} from './Login.styled';
import { PrimaryButton } from '../../styles/Global.styled';
import logo from '../../assets/logo.png';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => (
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
        onSubmit={(values) => console.log(values)}
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
);

export { Login };
