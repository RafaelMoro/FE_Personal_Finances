import { Field, Formik } from 'formik';

import { AnimateBox } from '../../animations/AnimateBox';
import { IUserAndPasswordProps } from './interface';
import { UserAndPasswordSchema } from '../../validationsSchemas/login.schema';
import { InputForm, PrimaryButton, CancelButton } from '../../styles';
import { FormContainer, FormActionButtons } from '../../styles/LoginModule.styled';

const initialValuesUserAndPassword = {
  email: '',
  password: '',
  confirmPassword: '',
};

const UserAndPassword = ({
  goBack, goNext, counterView, direction,
}: IUserAndPasswordProps) => {
  if (counterView !== 1) return null;
  return (
    <Formik
      initialValues={initialValuesUserAndPassword}
      validationSchema={UserAndPasswordSchema}
      onSubmit={(values) => goNext(values)}
      validateOnMount
    >
      {({ submitForm }) => (
        <AnimateBox direction={direction}>
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
              <CancelButton variant="contained" onClick={goBack} size="medium">Return</CancelButton>
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">Create Account</PrimaryButton>
            </FormActionButtons>
          </FormContainer>
        </AnimateBox>
      )}
    </Formik>
  );
};

export { UserAndPassword };
