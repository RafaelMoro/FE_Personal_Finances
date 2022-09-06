import { CardContent } from '@mui/material';

import {
  Main, LoginCardForm, LogoContainer, LogoImageContainer, LogoTitle, LoginCardActions,
  FormTitle, FormInstructions, InputForm,
} from './Login.styled';
import { PrimaryButton } from '../../styles/Global.styled';
import logo from '../../assets/logo.png';

const Login = () => (
  <Main>
    <LogoContainer>
      <LogoImageContainer>
        <img src={logo} alt="logo" />
      </LogoImageContainer>
      <LogoTitle>Cuenta conmigo</LogoTitle>
    </LogoContainer>
    <LoginCardForm>
      <CardContent>
        <FormTitle>Welcome back</FormTitle>
        <FormInstructions>Enter your credentials to enter your account.</FormInstructions>
        <InputForm label="Email" variant="standard" fullWidth />
        <InputForm label="Password" variant="standard" fullWidth />
      </CardContent>
      <LoginCardActions>
        <PrimaryButton variant="contained" type="submit" size="medium">Login</PrimaryButton>
      </LoginCardActions>
    </LoginCardForm>
  </Main>
);

export { Login };
