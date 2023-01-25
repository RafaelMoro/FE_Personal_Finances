import { Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { InputForm, PrimaryButton, SecondaryButton } from '../../styles';
import { FormContainer } from '../../styles/LoginModule.styled';

interface IPersonalInformationProps {
  goNext: () => void;
  counterView: number;
}

const PersonalInformation = ({ goNext, counterView }: IPersonalInformationProps) => {
  const navigate = useNavigate();
  const handleCancel = () => navigate('/');

  if (counterView === 1) return null;

  return (
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
        name="middleName"
        type="text"
        variant="standard"
        label="Middle Name"
      />
      <Field
        component={InputForm}
        name="lastName"
        type="text"
        variant="standard"
        label="Last Name"
      />
      <SecondaryButton variant="contained" onClick={handleCancel} size="medium">Cancel</SecondaryButton>
      <PrimaryButton variant="contained" onClick={goNext} size="medium">Next</PrimaryButton>
    </FormContainer>
  );
};

export { PersonalInformation };
