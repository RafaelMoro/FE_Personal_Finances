import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Formik, Field,
} from 'formik';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import { useNotification } from '../../../hooks/useNotification';
import { useForgotPasswordMutation } from '../../../redux/slices/User/actions/forgotPassword';
import { LOGIN_ROUTE } from '../../RoutesConstants';
import {
  ERROR_MESSAGE_GENERAL, ERROR_TITLE_GENERAL, ERROR_USER_NOT_FOUND, SUCCESS_FORGOT_PASSWORD_DESC, SUCCESS_FORGOT_PASSWORD_TITLE,
} from '../../../constants';
import { GeneralError } from '../../../globalInterface';
import { ForgotPasswordValues } from './interface';
import { SystemStateEnum } from '../../../enums';
import { ForgotPasswordSchema } from '../../../validationsSchemas/login.schema';
import { ActionButtonPanel } from '../../../components/templates';
import { Notification } from '../../../components/UI';
import {
  Main, FormTitle, FormDescription, FormContainer, MainContainer,
} from '../../../styles/LoginModule.styled';
import {
  InputForm, SecondaryButton,
} from '../../../styles';

const createAccountButton: EmotionJSX.Element = <SecondaryButton variant="contained" size="medium">Create Account</SecondaryButton>;

const ForgotPassword = (): ReactElement => {
  const navigate = useNavigate();
  const {
    showNotification, hideNotification, notificationInfo,
    updateTitle, updateDescription, updateStatus, notification,
  } = useNotification({
    title: SUCCESS_FORGOT_PASSWORD_TITLE,
    description: SUCCESS_FORGOT_PASSWORD_DESC,
    status: SystemStateEnum.Success,
  });
  const [forgotPasswordMutation, { isLoading, isSuccess }] = useForgotPasswordMutation();
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const toggleUserNotFound = () => setUserNotFound(!userNotFound);

  const handleSubmit = async (values: ForgotPasswordValues) => {
    try {
      await forgotPasswordMutation({ values }).unwrap();

      // Reset notification title, description and status.
      if (notificationInfo.current.title !== SUCCESS_FORGOT_PASSWORD_TITLE) {
        updateTitle(SUCCESS_FORGOT_PASSWORD_TITLE);
        updateDescription(SUCCESS_FORGOT_PASSWORD_DESC);
        updateStatus(SystemStateEnum.Success);
      }

      showNotification();
      setTimeout(() => {
        navigate(LOGIN_ROUTE);
      }, 5000);
    } catch (err) {
      const error = err as GeneralError;
      const message = error?.data?.error?.message;
      if (message === ERROR_USER_NOT_FOUND) {
        toggleUserNotFound();
        updateTitle('Oops!');
        updateDescription("We don't have any email associated to an account.");
        updateStatus(SystemStateEnum.Info);
        showNotification();
        return;
      }

      updateTitle(ERROR_TITLE_GENERAL);
      updateDescription(ERROR_MESSAGE_GENERAL);
      updateStatus(SystemStateEnum.Error);

      showNotification();
    }
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
          userNotFound
            ? createAccountButton
            : null
        }
      />
      )}
      <Main>
        <MainContainer>
          <FormTitle variant="h1">Forgot password</FormTitle>
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
                <ActionButtonPanel
                  routeCancelButton={LOGIN_ROUTE}
                  minWidthNumber="10.5"
                  submitButtonText="Send"
                  loading={isLoading}
                  success={isSuccess}
                  disableCancelButton={(isLoading || isSuccess)}
                  submitForm={submitForm}
                />
              </FormContainer>
            )}
          </Formik>
        </MainContainer>
      </Main>
    </>
  );
};

export { ForgotPassword };
