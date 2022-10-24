import { ReactElement } from 'react';

import { Main, ForgotPasswordTitle, ForgotPasswordDescription } from './ForgotPassword.styled';

const ForgotPassword = (): ReactElement => (
  <Main>
    <ForgotPasswordTitle>Forgot password</ForgotPasswordTitle>
    <ForgotPasswordDescription>
      Please enter your email and
      we will send you the instructions to reset your password.
    </ForgotPasswordDescription>
    <form action="POST">
      <input type="email" placeholder="email" />
      <button type="submit">Change my password</button>
    </form>
  </Main>
);

export { ForgotPassword };
