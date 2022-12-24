import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  Formik, Field,
} from 'formik';

import { FORGOT_PASSWORD_POST_ROUTE, FORGOT_PASSWORD_REDIRECT_ROUTE } from './constants';
import { IForgotPasswordValues } from './interface';
import { SystemStateEnum } from '../../enums';
import { showNotificationAtom } from '../../atoms';
import { ForgotPasswordSchema } from '../../validationsSchemas/login.schema';
import { postRequest } from '../../utils/PostRequest.ts';
import { Notification } from '../../components/UI';
import {
  Main, ForgotPasswordTitle, ForgotPasswordDescription, ForgotPasswordForm, ForgotPasswordContainer,
} from './ForgotPassword.styled';
import { InputForm, PrimaryButton } from '../../styles';

const ForgotPassword = (): ReactElement => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useAtom(showNotificationAtom);

  const handleSubmit = async (values: IForgotPasswordValues) => {
    await postRequest(values, FORGOT_PASSWORD_POST_ROUTE);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      navigate(FORGOT_PASSWORD_REDIRECT_ROUTE);
    }, 5000);
  };

  const toggleShowNotification = () => {
    setShowNotification(!showNotification);
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
    </>
  );
};

export { ForgotPassword };
