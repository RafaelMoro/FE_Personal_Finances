import { ReactElement } from 'react';

const ForgotPassword = (): ReactElement => (
  <main>
    <h1>Forgot password</h1>
    <p>
      If you forgot your password, please enter your email and
      we will send you an email to reset your password.
    </p>
    <form action="POST">
      <input type="email" placeholder="email" />
      <button type="submit">Change my password</button>
    </form>
  </main>
);

export { ForgotPassword };
