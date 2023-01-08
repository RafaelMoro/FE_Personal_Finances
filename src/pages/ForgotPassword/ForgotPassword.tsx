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

const NOTIFICATION_TITLE = 'Email Sent';
const NOTIFICATION_DESCRIPTION = 'Kindly check your email inbox and follow the instructions.';
const NOTIFICATION_STATUS = SystemStateEnum.Success;

const NOTIFICATION_ERROR_TITLE = 'Incorrect Email.';
const NOTIFICATION_ERROR_DESCRIPTION = 'Verify that your email is correct or create an account';
const NOTIFICATION_ERROR_STATUS = SystemStateEnum.Info;

const ForgotPassword = (): ReactElement => {
  const navigate = useNavigate();
  const {
    showNotification, toggleShowNotification, notificationInfo,
    updateTitle, updateDescription, updateStatus,
  } = useNotification({
    title: NOTIFICATION_TITLE, description: NOTIFICATION_DESCRIPTION, status: NOTIFICATION_STATUS,
  });

  const handleSubmit = async (values: IForgotPasswordValues) => {
    const responseForgotPasswordRequest = await postRequest(values, FORGOT_PASSWORD_POST_ROUTE);

    if (responseForgotPasswordRequest?.error) {
      updateTitle(NOTIFICATION_ERROR_TITLE);
      updateDescription(NOTIFICATION_ERROR_DESCRIPTION);
      updateStatus(NOTIFICATION_ERROR_STATUS);

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
