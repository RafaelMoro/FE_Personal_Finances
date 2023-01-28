import { Field, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { IPersonalInformationProps } from './interface';
import { PersonalInformationSchema } from '../../validationsSchemas/login.schema';
import { InputForm, PrimaryButton, SecondaryButton } from '../../styles';
import { FormContainer, FormActionButtons } from '../../styles/LoginModule.styled';

const initialValuesPersonalInfo = {
  firstName: '',
  middleName: '',
  lastName: '',
};

const PersonalInformation = ({ goNext, counterView }: IPersonalInformationProps) => {
  const navigate = useNavigate();
  const handleCancel = () => navigate('/');

  if (counterView !== 0) return null;

  return (
    <Formik
      initialValues={initialValuesPersonalInfo}
      validationSchema={PersonalInformationSchema}
      onSubmit={(values) => goNext(values)}
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
          <FormActionButtons>
            <SecondaryButton variant="contained" onClick={handleCancel} size="medium">Cancel</SecondaryButton>
            <PrimaryButton variant="contained" onClick={submitForm} size="medium">Next</PrimaryButton>
          </FormActionButtons>
        </FormContainer>
      )}
    </Formik>
  );
};

export { PersonalInformation };
