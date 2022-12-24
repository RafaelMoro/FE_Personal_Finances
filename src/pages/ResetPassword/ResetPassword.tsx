import { ReactElement } from 'react';
import { Formik, Field } from 'formik';

import { IResetPasswordValues } from './interface';
import {
  Main, ForgotPasswordContainer, ForgotPasswordTitle, ForgotPasswordDescription, ForgotPasswordForm,
} from '../ForgotPassword/ForgotPassword.styled';
import { ResetPasswordSchema } from '../../validationsSchemas/login.schema';
import { PrimaryButton, InputForm } from '../../styles';

const ResetPassword = (): ReactElement => {
  const handleSubmit = (values: IResetPasswordValues) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };
  return (
    <Main>
      <ForgotPasswordContainer>
        <ForgotPasswordTitle>Reset Password</ForgotPasswordTitle>
        <ForgotPasswordDescription>
          Enter your new password in the fields below:
        </ForgotPasswordDescription>
        <Formik
          initialValues={{ newPassword: '', confirmPassword: '' }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values) => handleSubmit(values)}
          validateOnMount
        >
          {({ submitForm }) => (
            <ForgotPasswordForm>
              <Field
                component={InputForm}
                name="newPassword"
                type="password"
                variant="standard"
                label="New Password"
              />
              <Field
                component={InputForm}
                name="confirmPassword"
                type="password"
                variant="standard"
                label="Confirm Password"
              />
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">Reset Password</PrimaryButton>
            </ForgotPasswordForm>
          )}
        </Formik>
      </ForgotPasswordContainer>
    </Main>
  );
};

export { ResetPassword };
