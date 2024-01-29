import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Formik, Field,
} from 'formik';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import { AxiosError } from 'axios';
import { useNotification } from '../../../hooks/useNotification';
import { LOGIN_ROUTE } from '../../RoutesConstants';
import { ForgotPasswordValues } from './interface';
import { SystemStateEnum } from '../../../enums';
import { ForgotPasswordSchema } from '../../../validationsSchemas/login.schema';
import { Notification } from '../../../components/UI';
import {
  Main, FormTitle, FormDescription, FormContainer, MainContainer,
} from '../../../styles/LoginModule.styled';
import {
  InputForm, SecondaryButton,
} from '../../../styles';
import { ActionButtonPanel } from '../../../components/templates';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { forgotPasswordThunkFn } from '../../../redux/slices/User/actions/forgotPassword';

const NOTIFICATION_TITLE = 'Email Sent';
const NOTIFICATION_DESCRIPTION = 'Kindly check your email inbox and follow the instructions.';
const NOTIFICATION_STATUS = SystemStateEnum.Success;

const NOTIFICATION_ERROR_TITLE = 'Incorrect Email.';
const NOTIFICATION_ERROR_DESCRIPTION = 'Verify that your email is correct or create an account';
const NOTIFICATION_ERROR_STATUS = SystemStateEnum.Info;

const createAccountButton: EmotionJSX.Element = <SecondaryButton variant="contained" size="medium">Create Account</SecondaryButton>;

const ForgotPassword = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLoadingOnAction = useAppSelector((state) => state.user.loadingOnAction);
  const {
    showNotification, hideNotification, notificationInfo,
    updateTitle, updateDescription, updateStatus, notification,
  } = useNotification({
    title: NOTIFICATION_TITLE, description: NOTIFICATION_DESCRIPTION, status: NOTIFICATION_STATUS,
  });

  const handleSubmit = async (values: ForgotPasswordValues) => {
    try {
      await dispatch(forgotPasswordThunkFn(values)).unwrap();

      if (notificationInfo.current.title === NOTIFICATION_ERROR_TITLE) {
        updateTitle(NOTIFICATION_TITLE);
        updateDescription(NOTIFICATION_DESCRIPTION);
        updateStatus(NOTIFICATION_STATUS);
      }

      showNotification();
      setTimeout(() => {
        navigate(LOGIN_ROUTE);
      }, 5000);
    } catch (err) {
      const errorCatched = err as AxiosError;
      // eslint-disable-next-line no-console
      console.error(errorCatched.message);
      updateTitle(NOTIFICATION_ERROR_TITLE);
      updateDescription(NOTIFICATION_ERROR_DESCRIPTION);
      updateStatus(NOTIFICATION_ERROR_STATUS);

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
                <ActionButtonPanel
                  route={LOGIN_ROUTE}
                  minWidthNumber="10.5"
                  buttonText="Enviar"
                  loading={userLoadingOnAction}
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
