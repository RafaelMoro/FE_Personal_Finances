/* eslint-disable no-console */
import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik, Field } from 'formik';

import { IResetPasswordValues } from './interface';
import { postRequest } from '../../utils/PostRequest.ts';
import { RESET_PASSWORD_POST_ROUTE } from '../ForgotPassword/constants';
import { errors } from './constants';
import {
  Main, MainContainer, FormTitle, FormDescription, FormContainer,
} from '../../styles/LoginModule.styled';
import { ResetPasswordSchema } from '../../validationsSchemas/login.schema';
import { PrimaryButton, InputForm } from '../../styles';

const ResetPassword = (): ReactElement => {
  const location = useLocation();
  const { pathname } = location;

  const handleSubmit = async (values: IResetPasswordValues) => {
    const { password } = values;
    const valuesRequest = { password };
    const completeRoute = RESET_PASSWORD_POST_ROUTE + pathname;
    const responseResetPasswordRequest = await postRequest(valuesRequest, completeRoute);

    if (responseResetPasswordRequest?.error) {
      const errorMessage = responseResetPasswordRequest?.message as string;
      errors.forEach((error) => {
        if (error === errorMessage) {
          // show notification of try again
        }
      });
    } else {
      // Show notification of success.
      // Redirect into Login.
    }
  };
  return (
    <Main>
      <MainContainer>
        <FormTitle>Reset Password</FormTitle>
        <FormDescription>
          Enter your new password in the fields below:
        </FormDescription>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values) => handleSubmit(values)}
          validateOnMount
        >
          {({ submitForm }) => (
            <FormContainer>
              <Field
                component={InputForm}
                name="password"
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
            </FormContainer>
          )}
        </Formik>
      </MainContainer>
    </Main>
  );
};

export { ResetPassword };
