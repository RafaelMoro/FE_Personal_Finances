import {
  ReactElement, useState, useRef,
} from 'react';

import { ICreateAccountValues, PersonalInfoFormValues, UserAndPasswordFormValues } from './interface';
import { PersonalInformation } from './PersonalInformation';
import { UserAndPassword } from './UserAndPassword';
// import { LOGIN_ROUTE } from '../ForgotPassword/constants';
import {
  Main, MainContainer, FormTitle, FormDescription,
} from '../../styles/LoginModule.styled';

const initialValuesCreateAccountForm = {
  email: '',
  firstName: '',
  middleName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

const CreateAccount = ():ReactElement => {
  const [counterView, setCounterView] = useState<number>(0);
  const data = useRef<ICreateAccountValues>(initialValuesCreateAccountForm);

  const updateData = (newInfo: PersonalInfoFormValues | UserAndPasswordFormValues) => {
    const { current } = data;
    data.current = { ...current, ...newInfo };
  };

  const handleSubmit = (values: ICreateAccountValues) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const goBack = () => setCounterView(counterView - 1);
  const goNext = (props: PersonalInfoFormValues | UserAndPasswordFormValues) => {
    updateData(props);
    setCounterView(counterView + 1);
    if (counterView === 2) {
      // show loader...
      handleSubmit(data.current);
    }
  };

  return (
    <Main>
      <MainContainer>
        <FormTitle>Create account</FormTitle>
        <FormDescription>Fill the following information to create your account.</FormDescription>
        <PersonalInformation goNext={goNext} counterView={counterView} />
        <UserAndPassword goBack={goBack} goNext={goNext} counterView={counterView} />
      </MainContainer>
    </Main>
  );
};

export { CreateAccount };
