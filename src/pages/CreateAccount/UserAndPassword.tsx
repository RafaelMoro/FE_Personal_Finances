import { Field, Formik } from 'formik';

import { IUserAndPasswordProps } from './interface';
import { UserAndPasswordSchema } from '../../validationsSchemas/login.schema';
import { InputForm, PrimaryButton, SecondaryButton } from '../../styles';
import { FormContainer, FormActionButtons } from '../../styles/LoginModule.styled';

const initialValuesUserAndPassword = {
  email: '',
  password: '',
  confirmPassword: '',
};

const UserAndPassword = ({ goBack, goNext, counterView }: IUserAndPasswordProps) => {
  if (counterView !== 1) return null;
  return (
    <Formik
      initialValues={initialValuesUserAndPassword}
      validationSchema={UserAndPasswordSchema}
      onSubmit={(values) => goNext(values)}
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
          <FormActionButtons>
            <SecondaryButton variant="contained" onClick={goBack} size="medium">Return</SecondaryButton>
            <PrimaryButton variant="contained" onClick={submitForm} size="medium">Create Account</PrimaryButton>
          </FormActionButtons>
        </FormContainer>
      )}
    </Formik>
  );
};

export { UserAndPassword };
