import { ReactElement, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';

import {
  ERROR_MESSAGE_GENERAL, ERROR_TITLE_GENERAL, JWT_EXPIRED_CATCH_ERROR, SUCCESS_PASSWORD_RESET_DESC,
  SUCCESS_PASSWORD_RESET_TITLE, TOKEN_EXPIRED_DESC, TOKEN_EXPIRED_TITLE,
} from '../../../constants';
import { RESET_PASSWORD_POST_ROUTE } from './constants';
import { LOGIN_ROUTE, FORGOT_PASSWORD_ROUTE, DASHBOARD_ROUTE } from '../../RoutesConstants';

import { ResetPasswordFormValues, ResetPasswordValues } from './interface';
import { GeneralError } from '../../../globalInterface';
import { SystemStateEnum } from '../../../enums';
import { ResetPasswordSchema } from '../../../validationsSchemas/login.schema';
import { useNotification } from '../../../hooks/useNotification';
import { useResetPasswordMutation } from '../../../redux/slices/User/actions/resetPassword';

import { Notification } from '../../../components/UI';
import {
  Main, MainContainer, FormTitle, FormDescription, FormContainer,
} from '../../../styles/LoginModule.styled';
import { TogglePasswordAdornment } from '../../../components/UI/TogglePasswordAdornment';
import { ActionButtonPanel } from '../../../components/templates';
import { InputForm } from '../../../styles';

const ResetPassword = (): ReactElement => {
  const {
    notification, toggleShowNotification, notificationInfo,
    updateTitle, updateDescription, updateStatus,
  } = useNotification({
    title: SUCCESS_PASSWORD_RESET_TITLE, description: SUCCESS_PASSWORD_RESET_DESC, status: SystemStateEnum.Success,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [resetPasswordMutation, { isLoading, isSuccess }] = useResetPasswordMutation();
  const { pathname } = location;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    try {
      const { password } = values;
      const valuesRequest: ResetPasswordValues = { password };
      const completeRoute = RESET_PASSWORD_POST_ROUTE + pathname;
      await resetPasswordMutation({ values: valuesRequest, route: completeRoute }).unwrap();

      toggleShowNotification();
      setTimeout(() => {
        navigate(LOGIN_ROUTE);
      }, 5000);
    } catch (err) {
      const error = err as GeneralError;
      const message = error?.data?.error?.message;
      if (message === JWT_EXPIRED_CATCH_ERROR) {
        updateTitle(TOKEN_EXPIRED_TITLE);
        updateDescription(TOKEN_EXPIRED_DESC);
        updateStatus(SystemStateEnum.Error);

        setTimeout(() => {
          navigate(FORGOT_PASSWORD_ROUTE);
        }, 5000);
      } else {
        updateTitle(ERROR_TITLE_GENERAL);
        updateDescription(ERROR_MESSAGE_GENERAL);
        updateStatus(SystemStateEnum.Error);

        setTimeout(() => {
          navigate(DASHBOARD_ROUTE);
        }, 5000);
      }

      toggleShowNotification();
    }
  };

  return (
    <>
      {notification && (
        <Notification
          title={notificationInfo.current.title}
          description={notificationInfo.current.description}
          status={notificationInfo.current.status}
          close={toggleShowNotification}
        />
      )}
      <Main>
        <MainContainer>
          <FormTitle variant="h1">Reset Password</FormTitle>
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
                  type={(showPassword) ? 'text' : 'password'}
                  variant="standard"
                  label="New Password"
                  InputProps={{
                    endAdornment: <TogglePasswordAdornment showPassword={showPassword} toggleShowPassword={toggleShowPassword} />,
                  }}
                />
                <Field
                  component={InputForm}
                  name="confirmPassword"
                  type={(showPassword) ? 'text' : 'password'}
                  variant="standard"
                  label="Confirm Password"
                  InputProps={{
                    endAdornment: <TogglePasswordAdornment showPassword={showPassword} toggleShowPassword={toggleShowPassword} />,
                  }}
                />
                <ActionButtonPanel
                  minWidthNumber="19"
                  submitButtonText="Reset Password"
                  submitForm={submitForm}
                  routeCancelButton={LOGIN_ROUTE}
                  success={isSuccess}
                  loading={isLoading}
                />
              </FormContainer>
            )}
          </Formik>
        </MainContainer>
      </Main>
    </>
  );
};

export { ResetPassword };
