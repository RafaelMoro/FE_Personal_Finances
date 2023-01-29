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
  const [[counterView, direction], setCounterView] = useState([0, 0]);
  const data = useRef<ICreateAccountValues>(initialValuesCreateAccountForm);

  const updateData = (newInfo: PersonalInfoFormValues | UserAndPasswordFormValues) => {
    const { current } = data;
    data.current = { ...current, ...newInfo };
  };

  const paginate = (newDirection: number) => {
    setCounterView([counterView + newDirection, newDirection]);
  };

  const handleSubmit = (values: ICreateAccountValues) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const goBack = () => {
    // Giving -1 to paginate means slide to left.
    paginate(-1);
  };

  const goNext = (props: PersonalInfoFormValues | UserAndPasswordFormValues) => {
    updateData(props);
    // Giving 1 to paginate means slide to right
    paginate(1);
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
          goBack={goBack}
          goNext={goNext}
          counterView={counterView}
          direction={direction}
        />
      </MainContainer>
    </Main>
  );
};

export { CreateAccount };
