import { CardContent } from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';

import { REGISTER_ROUTE } from '../../RoutesConstants';
import { useLogin } from '../../../hooks/useLogin';
import { LoginSchema } from '../../../validationsSchemas';
import { Notification } from '../../../components/UI';
import { BrandLogoName } from '../../../components/templates/BrandLogoName';
import {
  Main, LoginCard, LogoContainer, LoginCardActions,
  FormTitle, FormInstructions, LoginInput, ForgotPasswordLink,
} from './Login.styled';
import { PrimaryButton, SecondaryButton, AnchorButton } from '../../../styles';
import { LoginValues } from './interface';
import { loginUser } from '../../../redux/slices/User/user.slice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const Login = () => {
  const {
    handleShowNotification, notificationInfo, notification, submitOnPressEnter,
  } = useLogin();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userInfo);
  const handleSubmit = async (values: LoginValues) => dispatch(loginUser(values));

  return (
    <>
      {notification && (
      <Notification
        title={notificationInfo.current.title}
        description={notificationInfo.current.description}
        status={notificationInfo.current.status}
        close={handleShowNotification}
      />
      )}
      <Main>
        <LogoContainer>
          <BrandLogoName isLoginPage />
        </LogoContainer>
        <LoginCard>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleSubmit(values)}
            validateOnMount
          >
            {({ submitForm }) => (
              <Form
                onKeyDown={(event) => {
                  submitOnPressEnter(event, submitForm);
                }}
              >
                <CardContent>
                  <FormTitle>Welcome back</FormTitle>
                  <FormInstructions>Enter your credentials to enter your account.</FormInstructions>
                  <Field
                    component={LoginInput}
                    name="email"
                    type="email"
                    variant="standard"
                    fullWidth
                    label="Email"
                  />
                  <Field
                    component={LoginInput}
                    name="password"
                    type="password"
                    variant="standard"
                    fullWidth
                    label="Password"
                  />
                  <ForgotPasswordLink to="/forgot-password">Do you forgot your password? </ForgotPasswordLink>
                </CardContent>
                <LoginCardActions>
                  <AnchorButton to={REGISTER_ROUTE}>
                    <SecondaryButton variant="contained" size="medium">Register</SecondaryButton>
                  </AnchorButton>
                  <PrimaryButton variant="contained" onClick={submitForm} size="medium">Login</PrimaryButton>
                </LoginCardActions>
              </Form>
            )}
          </Formik>
        </LoginCard>
      </Main>
    </>
  );
};

export { Login };
