import {
  Button, Typography, TextField, CardContent,
} from '@mui/material';

import {
  Main, LoginCardForm, LogoContainer, LogoImageContainer, LogoTitle, LoginCardActions,
  buttonStyles, titleStyles, descriptionStyle, inputStyles,
} from './Login.styled';
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
        <Typography sx={titleStyles} component="h1">
          Welcome back
        </Typography>
        <Typography sx={descriptionStyle} component="p" color="text.secondary" gutterBottom>
          Enter your credentials to enter your account.
        </Typography>
        <TextField sx={inputStyles} label="Email" variant="outlined" fullWidth />
        <TextField sx={inputStyles} label="Password" variant="outlined" fullWidth />
      </CardContent>
      <LoginCardActions>
        <Button sx={buttonStyles} variant="contained" type="submit" size="medium">Login</Button>
      </LoginCardActions>
    </LoginCardForm>
  </Main>
);

export { Login };
