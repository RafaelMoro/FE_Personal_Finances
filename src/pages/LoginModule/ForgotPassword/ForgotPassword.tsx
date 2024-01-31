import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Formik, Field,
} from 'formik';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import { AxiosError } from 'axios';
import { useNotification } from '../../../hooks/useNotification';
import { LOGIN_ROUTE } from '../../RoutesConstants';
import {
  ERROR_INCORRECT_MAIL_TITLE,
  ERROR_MESSAGE_GENERAL, ERROR_TITLE_GENERAL, SUCCESS_FORGOT_PASSWORD_DESC, SUCCESS_FORGOT_PASSWORD_TITLE,
} from '../../../constants';
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
import { resetSuccessOnAction } from '../../../redux/slices/User/user.slice';

const createAccountButton: EmotionJSX.Element = <SecondaryButton variant="contained" size="medium">Create Account</SecondaryButton>;

const ForgotPassword = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLoadingOnAction = useAppSelector((state) => state.user.loadingOnAction);
  const userSuccessOnAction = useAppSelector((state) => state.user.successOnAction);
  const {
    showNotification, hideNotification, notificationInfo,
    updateTitle, updateDescription, updateStatus, notification,
  } = useNotification({
    title: SUCCESS_FORGOT_PASSWORD_TITLE,
    description: SUCCESS_FORGOT_PASSWORD_DESC,
    status: SystemStateEnum.Success,
  });

  const handleSubmit = async (values: ForgotPasswordValues) => {
    try {
      await dispatch(forgotPasswordThunkFn(values)).unwrap();

      if (notificationInfo.current.title === ERROR_INCORRECT_MAIL_TITLE) {
        updateTitle(SUCCESS_FORGOT_PASSWORD_TITLE);
        updateDescription(SUCCESS_FORGOT_PASSWORD_DESC);
        updateStatus(SystemStateEnum.Success);
      }

      showNotification();
      setTimeout(() => {
        dispatch(resetSuccessOnAction());
        navigate(LOGIN_ROUTE);
      }, 5000);
    } catch (err) {
      const errorCatched = err as AxiosError;
      // eslint-disable-next-line no-console
      console.error('Error while submitting forgot Password: ', errorCatched);
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
          notificationInfo.current.status === SystemStateEnum.Error
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
                  success={userSuccessOnAction}
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
