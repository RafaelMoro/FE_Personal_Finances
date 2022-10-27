/* eslint-disable no-console */
import { ReactElement } from 'react';
import {
  Formik, Field,
} from 'formik';

import {
  Main, ForgotPasswordTitle, ForgotPasswordDescription, ForgotPasswordForm, ForgotPasswordContainer,
} from './ForgotPassword.styled';
import { InputForm, PrimaryButton } from '../../styles';
import { ForgotPasswordSchema } from '../../validationsSchemas/login.schema';
import { ForgotPasswordRequest } from './ForgotPassword.request';
import { IForgotPasswordValues } from './interface';

const ForgotPassword = (): ReactElement => {
  const handleSubmit = async (values: IForgotPasswordValues) => {
    await ForgotPasswordRequest(values);
    // show notification
  };

  return (
    <Main>
      <ForgotPasswordContainer>
        <ForgotPasswordTitle>Forgot password</ForgotPasswordTitle>
        <ForgotPasswordDescription>
          Please enter your email and
          we will send you the instructions to reset your password.
        </ForgotPasswordDescription>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={(values) => handleSubmit(values)}
          validateOnMount
        >
          {({ submitForm }) => (
            <ForgotPasswordForm>
              <Field
                component={InputForm}
                name="email"
                type="email"
                variant="standard"
                label="Email"
              />
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">Change my password</PrimaryButton>
            </ForgotPasswordForm>
          )}
        </Formik>
      </ForgotPasswordContainer>
    </Main>
  );
};

export { ForgotPassword };
