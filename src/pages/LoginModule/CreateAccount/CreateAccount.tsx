/* eslint-disable react/no-unstable-nested-components */
import {
  ReactElement, useEffect, useRef, useState,
} from 'react';

import {
  ICreateAccountValues, PersonalInfoFormValues, UserAndPasswordFormValues,
} from './interface';
import { CREATE_ACCOUNT_POST_ROUTE, ERROR_RESPONSE_USER_CREATED } from './constants';
import { postRequest } from '../../../utils/PostRequest.ts';
import { useAnimateBox } from '../../../hooks/useAnimateBox';
import {
  CreateAccountResult, SuccessCreateAccount, ErrorCreateAccount, LoadingCreateAccount,
} from './CreateAccountResult';
import { PersonalInformation } from './PersonalInformation';
import { UserAndPassword } from './UserAndPassword';
import {
  Main, MainContainer, FormTitle, FormDescription,
} from '../../../styles/LoginModule.styled';

const ERROR_MESSAGE_CREATE_ACCOUNT = 'Something went wrong, Try again in some minutes.';
const ERROR_MESSAGE_EMAIL_EXISTS = 'The email entered is registered to other user. Please try a different email.';
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
    direction, counterView, goPreviousView, goNextView, resetCounterView,
  } = useAnimateBox();
  const formData = useRef<ICreateAccountValues>(initialValuesCreateAccountForm);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>(ERROR_MESSAGE_CREATE_ACCOUNT);

  const updateData = (newInfo: PersonalInfoFormValues | UserAndPasswordFormValues) => {
    const { current } = formData;
    formData.current = { ...current, ...newInfo };
  };

  const handleSubmit = async (values: ICreateAccountValues) => {
    const { confirmPassword, ...restOfValues } = values;
    const response = await postRequest(restOfValues, CREATE_ACCOUNT_POST_ROUTE);
    setIsLoading(false);

    if (!response) {
      // if response is undefined, the server did not respond.
      setIsError(true);
      return;
    }

    if (response?.error) {
      setIsError(true);
      if (response?.message === ERROR_RESPONSE_USER_CREATED) {
        setError(ERROR_MESSAGE_EMAIL_EXISTS);
      }
    }
  };

  const goNext = (props: PersonalInfoFormValues | UserAndPasswordFormValues) => {
    updateData(props);
    goNextView();

    // This view means that the data is ready to be submitted.
    if (counterView === 1) {
      setIsLoading(true);
      handleSubmit(formData.current);
    }
  };

  useEffect(() => {
    if (!isLoading && counterView === 2) {
      setTimeout(() => goNextView(), 3000);
    }
  }, [counterView, goNextView, isLoading]);

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
        <LoadingCreateAccount counterView={counterView} direction={direction} />
        { (!isLoading) && (
          <CreateAccountResult
            counterView={counterView}
            direction={direction}
            isError={isError}
            onError={() => <ErrorCreateAccount error={error} resetCounterView={resetCounterView} />}
            onSuccess={() => <SuccessCreateAccount />}
          />
        )}
      </MainContainer>
    </Main>
  );
};

export { CreateAccount };
