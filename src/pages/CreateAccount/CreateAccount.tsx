import { ReactElement, useState } from 'react';
import { Formik } from 'formik';

import { ICreateAccountValues } from './interface';
import { CreateAccountSchema } from '../../validationsSchemas/login.schema';
import { PersonalInformation } from './PersonalInformation';
import { UserAndPassword } from './UserAndPassword';
// import { LOGIN_ROUTE } from '../ForgotPassword/constants';
import {
  Main, MainContainer, FormTitle, FormDescription,
} from '../../styles/LoginModule.styled';

const CreateAccount = ():ReactElement => {
  const [counterView, setCounterView] = useState<number>(0);

  const goBack = () => setCounterView(counterView - 1);
  const goNext = () => setCounterView(counterView + 1);

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
            <>
              <PersonalInformation goNext={goNext} counterView={counterView} />
              <UserAndPassword goBack={goBack} submitForm={submitForm} counterView={counterView} />
            </>
          )}
        </Formik>
      </MainContainer>
    </Main>
  );
};

export { CreateAccount };
