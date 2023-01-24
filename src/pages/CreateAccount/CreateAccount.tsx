import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Formik, Field,
} from 'formik';

import { ICreateAccountValues } from './interface';
import { CreateAccountSchema } from '../../validationsSchemas/login.schema';
import { LOGIN_ROUTE } from '../ForgotPassword/constants';
import { PrimaryButton, InputForm, SecondaryButton } from '../../styles';
import {
  Main, MainContainer, FormTitle, FormDescription, FormContainer,
} from '../../styles/LoginModule.styled';

const CreateAccount = ():ReactElement => {
  const navigate = useNavigate();
  const initialValuesCreateAccountForm = {
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: ICreateAccountValues) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const redirectButton = () => navigate(LOGIN_ROUTE);

  return (
    <Main>
      <MainContainer>
        <FormTitle>Create account</FormTitle>
        <FormDescription>Fill the following information to create your account.</FormDescription>
        <Formik
          initialValues={initialValuesCreateAccountForm}
          validationSchema={CreateAccountSchema}
          onSubmit={(values) => handleSubmit(values)}
          validateOnMount
        >
          {({ submitForm }) => (
            <FormContainer>
              <Field
                component={InputForm}
                name="firstName"
                type="text"
                variant="standard"
                label="First Name"
              />
              <Field
                component={InputForm}
                name="lastName"
                type="text"
                variant="standard"
                label="Last Name"
              />
              <Field
                component={InputForm}
                name="middleName"
                type="text"
                variant="standard"
                label="Middle Name"
              />
              <Field
                component={InputForm}
                name="email"
                type="email"
                variant="standard"
                label="Email"
              />
              <Field
                component={InputForm}
                name="password"
                type="password"
                variant="standard"
                label="Password"
              />
              <Field
                component={InputForm}
                name="confirmPassword"
                type="password"
                variant="standard"
                label="Confirm Password"
              />
              <SecondaryButton variant="contained" onClick={redirectButton} size="medium">Cancel</SecondaryButton>
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">Create Account</PrimaryButton>
            </FormContainer>
          )}
        </Formik>
      </MainContainer>
    </Main>
  );
};

export { CreateAccount };
