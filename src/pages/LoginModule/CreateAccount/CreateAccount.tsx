import {
  ReactElement, useRef,
} from 'react';

import { ICreateAccountValues, PersonalInfoFormValues, UserAndPasswordFormValues } from './interface';
import { CREATE_ACCOUNT_POST_ROUTE, ERROR_RESPONSE_USER_CREATED } from './constants';
import { useAnimateBox } from '../../../hooks/useAnimateBox';
import { postRequest } from '../../../utils/PostRequest.ts';
import { Loader } from '../../../animations/Loader';
import { PersonalInformation } from './PersonalInformation';
import { UserAndPassword } from './UserAndPassword';
import { Paragraph } from '../../../styles';
import {
  Main, MainContainer, FormTitle, FormDescription, LoaderContainer,
} from '../../../styles/LoginModule.styled';

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

  const handleSubmit = async (values: ICreateAccountValues) => {
    const { confirmPassword, ...restOfValues } = values;
    const rta = await postRequest(restOfValues, CREATE_ACCOUNT_POST_ROUTE);
    if (rta?.error) {
      if (rta?.message === ERROR_RESPONSE_USER_CREATED) {
        // eslint-disable-next-line no-console
        console.log('email exists with other user');
      }
      // show notification that something went wrong, try again later.
    }
    if (rta?.emailModel) {
      // User created successfully
      // eslint-disable-next-line no-console
      console.log('user created successfully');
    }
  };

  const goNext = (props: PersonalInfoFormValues | UserAndPasswordFormValues) => {
    updateData(props);
    goNextView();
    if (counterView === 1) {
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
        { counterView === 2 && (
          <LoaderContainer>
            <Loader />
            <Paragraph>Your account is being created. Please wait...</Paragraph>
          </LoaderContainer>
        ) }
      </MainContainer>
    </Main>
  );
};

export { CreateAccount };
