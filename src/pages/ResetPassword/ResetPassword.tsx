import { ReactElement } from 'react';

const ResetPassword = (): ReactElement => (
  <>
    <h1>Reset Password</h1>
    <p>Enter your new password in the fields below:</p>
    <input type="text" />
    <button type="button">Reset password</button>
  </>
);

export { ResetPassword };
