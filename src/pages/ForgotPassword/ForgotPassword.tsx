import { ReactElement, useRef } from 'react';
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
  const notificationInfo = useRef({
    title: 'Email Sent',
    description: 'Kindly check your email inbox and follow the instructions.',
    status: SystemStateEnum.Success,
  });

  const handleSubmit = async (values: IForgotPasswordValues) => {
    const responseForgotPasswordRequest = await postRequest(values, FORGOT_PASSWORD_POST_ROUTE);

    if (responseForgotPasswordRequest?.error) {
      notificationInfo.current.title = 'User not found';
      notificationInfo.current.description = 'Verify that your email is correct or create an account';
      notificationInfo.current.status = SystemStateEnum.Info;

      toggleShowNotification();
      return;
    }
    toggleShowNotification();
    setTimeout(() => {
      navigate(REDIRECT_ROUTE);
    }, 5000);
  };

  return (
    <>
      {showNotification && (
      <Notification
        title={notificationInfo.current.title}
        description={notificationInfo.current.description}
        status={notificationInfo.current.status}
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
