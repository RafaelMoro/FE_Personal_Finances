import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Formik, Field,
} from 'formik';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import { useNotification } from '../../../hooks/useNotification';
import { FORGOT_PASSWORD_POST_ROUTE } from './constants';
import { LOGIN_ROUTE } from '../../RoutesConstants';
import { IForgotPasswordValues } from './interface';
import { SystemStateEnum } from '../../../enums';
import { ForgotPasswordSchema } from '../../../validationsSchemas/login.schema';
import { postRequest } from '../../../utils/PostRequest.ts';
import { Notification } from '../../../components/UI';
import {
  Main, FormTitle, FormDescription, FormContainer, MainContainer,
} from '../../../styles/LoginModule.styled';
import {
  AnchorButton, CancelButton, InputForm, PrimaryButton, SecondaryButton,
} from '../../../styles';
import { ButtonContainer } from '../../../components/UI/Records/features/RecordTemplate/RecordTemplate.styled';

const NOTIFICATION_TITLE = 'Email Sent';
const NOTIFICATION_DESCRIPTION = 'Kindly check your email inbox and follow the instructions.';
const NOTIFICATION_STATUS = SystemStateEnum.Success;

const NOTIFICATION_ERROR_TITLE = 'Incorrect Email.';
const NOTIFICATION_ERROR_DESCRIPTION = 'Verify that your email is correct or create an account';
const NOTIFICATION_ERROR_STATUS = SystemStateEnum.Info;

const createAccountButton: EmotionJSX.Element = <SecondaryButton variant="contained" size="medium">Create Account</SecondaryButton>;

const ForgotPassword = (): ReactElement => {
  const navigate = useNavigate();
  const {
    showNotification, hideNotification, notificationInfo,
    updateTitle, updateDescription, updateStatus, notification,
  } = useNotification({
    title: NOTIFICATION_TITLE, description: NOTIFICATION_DESCRIPTION, status: NOTIFICATION_STATUS,
  });

  const handleSubmit = async (values: IForgotPasswordValues) => {
    const responseForgotPasswordRequest = await postRequest(values, FORGOT_PASSWORD_POST_ROUTE);

    if (responseForgotPasswordRequest?.error) {
      updateTitle(NOTIFICATION_ERROR_TITLE);
      updateDescription(NOTIFICATION_ERROR_DESCRIPTION);
      updateStatus(NOTIFICATION_ERROR_STATUS);

      showNotification();
      return;
    }

    // Update notification info in case the last notification was error.
    if (notificationInfo.current.title === NOTIFICATION_ERROR_TITLE) {
      updateTitle(NOTIFICATION_TITLE);
      updateDescription(NOTIFICATION_DESCRIPTION);
      updateStatus(NOTIFICATION_STATUS);
    }

    showNotification();
    setTimeout(() => {
      navigate(LOGIN_ROUTE);
    }, 5000);
  };

  return (
    <>
      {notification && (
      <Notification
        title={notificationInfo.current.title}
        description={notificationInfo.current.description}
        status={notificationInfo.current.status}
        close={hideNotification}
        UIElement={
          notificationInfo.current.status === NOTIFICATION_ERROR_STATUS
            ? createAccountButton
            : null
        }
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
                <ButtonContainer>
                  <PrimaryButton
                    sx={{ minWidth: '10.5rem' }}
                    variant="contained"
                    onClick={submitForm}
                    size="medium"
                  >
                    Enviar
                  </PrimaryButton>
                  <AnchorButton to={LOGIN_ROUTE}>
                    <CancelButton sx={{ minWidth: '10.5rem' }} variant="contained" size="medium">Cancel</CancelButton>
                  </AnchorButton>
                </ButtonContainer>
              </FormContainer>
            )}
          </Formik>
        </MainContainer>
      </Main>
    </>
  );
};

export { ForgotPassword };
