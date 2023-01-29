import {
  ReactElement, useRef,
} from 'react';

import { ICreateAccountValues, PersonalInfoFormValues, UserAndPasswordFormValues } from './interface';
import { useAnimateBox } from '../../hooks/useAnimateBox';
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
  const {
    direction, counterView, goPreviousView, goNextView,
  } = useAnimateBox();
  const data = useRef<ICreateAccountValues>(initialValuesCreateAccountForm);

  const updateData = (newInfo: PersonalInfoFormValues | UserAndPasswordFormValues) => {
    const { current } = data;
    data.current = { ...current, ...newInfo };
  };

  const handleSubmit = (values: ICreateAccountValues) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const goNext = (props: PersonalInfoFormValues | UserAndPasswordFormValues) => {
    updateData(props);
    goNextView();
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
        <PersonalInformation goNext={goNext} counterView={counterView} direction={direction} />
        <UserAndPassword
          goBack={goPreviousView}
          goNext={goNext}
          counterView={counterView}
          direction={direction}
        />
      </MainContainer>
    </Main>
  );
};

export { CreateAccount };
