import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Formik, Field,
} from 'formik';

import { useNotification } from '../../hooks/useNotification';
import { FORGOT_PASSWORD_POST_ROUTE, REDIRECT_ROUTE } from './constants';
import { IForgotPasswordValues } from './interface';
import { SystemStateEnum } from '../../enums';
import { ForgotPasswordSchema } from '../../validationsSchemas/login.schema';
import { postRequest } from '../../utils/PostRequest.ts';
import { Notification } from '../../components/UI';
import {
  Main, FormTitle, FormDescription, FormContainer, MainContainer,
} from '../../styles/LoginModule.styled';
import { InputForm, PrimaryButton } from '../../styles';

const ForgotPassword = (): ReactElement => {
  const navigate = useNavigate();
  const { showNotification, toggleShowNotification } = useNotification();

  const handleSubmit = async (values: IForgotPasswordValues) => {
    await postRequest(values, FORGOT_PASSWORD_POST_ROUTE);
    toggleShowNotification();
    setTimeout(() => {
      navigate(REDIRECT_ROUTE);
    }, 5000);
  };

  return (
    <>
      {showNotification && (
      <Notification
        title="Email Sent"
        description="Kindly check your email inbox and follow the instructions."
        status={SystemStateEnum.Success}
        close={toggleShowNotification}
      />
      )}
      <Main>
        <MainContainer>
          <FormTitle>Forgot password</FormTitle>
          <FormDescription>
            Please enter your email and
            we will send you the instructions to reset your password.
          </FormDescription>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={(values) => handleSubmit(values)}
            validateOnMount
          >
            {({ submitForm }) => (
              <FormContainer>
                <Field
                  component={InputForm}
                  name="email"
                  type="email"
                  variant="standard"
                  label="Email"
                />
                <PrimaryButton variant="contained" onClick={submitForm} size="medium">Change my password</PrimaryButton>
              </FormContainer>
            )}
          </Formik>
        </MainContainer>
      </Main>
    </>
  );
};

export { ForgotPassword };
