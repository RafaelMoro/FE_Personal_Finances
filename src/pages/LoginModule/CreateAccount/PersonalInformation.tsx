import { Field, Formik } from 'formik';

import { LOGIN_ROUTE } from '../../RoutesConstants';
import { IPersonalInformationProps } from './interface';
import { PersonalInformationSchema } from '../../../validationsSchemas/login.schema';
import {
  InputForm, PrimaryButton, CancelButton, AnchorButton,
} from '../../../styles';
import { AnimateBox } from '../../../animations/AnimateBox';
import { FormContainer, FormActionButtons } from '../../../styles/LoginModule.styled';

const initialValuesPersonalInfo = {
  firstName: '',
  middleName: '',
  lastName: '',
};

const PersonalInformation = ({ goNext, counterView, direction }: IPersonalInformationProps) => {
  if (counterView !== 0) return null;

  return (
    <Formik
      initialValues={initialValuesPersonalInfo}
      validationSchema={PersonalInformationSchema}
      onSubmit={(values) => goNext(values)}
      validateOnMount
    >
      {({ submitForm }) => (
        <AnimateBox direction={direction}>
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
              <AnchorButton to={LOGIN_ROUTE}>
                <CancelButton variant="contained" size="medium">Cancel</CancelButton>
              </AnchorButton>
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">Next</PrimaryButton>
            </FormActionButtons>
          </FormContainer>
        </AnimateBox>
      )}
    </Formik>
  );
};

export { PersonalInformation };
