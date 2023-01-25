import { Field } from 'formik';
import { InputForm, PrimaryButton, SecondaryButton } from '../../styles';
import { FormContainer } from '../../styles/LoginModule.styled';

interface IUserPasswordProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitForm: (() => Promise<void>) & (() => Promise<any>)
  goBack: () => void;
  counterView: number;
}

const UserAndPassword = ({ goBack, submitForm, counterView }: IUserPasswordProps) => {
  if (counterView === 0) return null;
  return (
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
      <SecondaryButton variant="contained" onClick={goBack} size="medium">Return</SecondaryButton>
      <PrimaryButton variant="contained" onClick={submitForm} size="medium">Create Account</PrimaryButton>
    </FormContainer>
  );
};

export { UserAndPassword };
