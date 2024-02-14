/* eslint-disable react/no-unstable-nested-components */
import {
  ReactElement, useRef, useState,
} from 'react';

import { ERROR_MESSAGE_GENERAL, ERROR_MESSAGE_EMAIL_EXISTS, ERROR_CATCH_USER_CREATED } from '../../../constants';
import {
  CreateUserValues, CreateUserValuesMutation, PersonalInfoFormValues, UserAndPasswordFormValues,
} from './interface';
import { GeneralError } from '../../../globalInterface';
import { useCreateUserMutation } from '../../../redux/slices/User/actions/createUser';
import { useAnimateBox } from '../../../hooks/useAnimateBox';

import {
  CreateAccountResult, SuccessCreateAccount, ErrorCreateAccount, LoadingCreateAccount,
} from './CreateAccountResult';
import { PersonalInformation } from './PersonalInformation';
import { UserAndPassword } from './UserAndPassword';
import {
  Main, MainContainer, FormTitle, FormDescription,
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
  const [createUserMutation, { isLoading, isError }] = useCreateUserMutation();
  const {
    direction, counterView, goPreviousView, goNextView, resetCounterView, getFinalResult,
  } = useAnimateBox();
  const formData = useRef<CreateUserValues>(initialValuesCreateAccountForm);
  const [errorText, setErrorText] = useState<string>(ERROR_MESSAGE_GENERAL);

  const handleErrorText = (newMessage: string) => setErrorText(newMessage);

  const updateData = (newInfo: PersonalInfoFormValues | UserAndPasswordFormValues) => {
    const { current } = formData;
    formData.current = { ...current, ...newInfo };
  };

  const handleSubmit = async (valuesReceived: CreateUserValues) => {
    try {
      // Omitting confirmPassword value as it's not needed.
      const {
        firstName, lastName, middleName, password, email,
      } = valuesReceived;
      const values: CreateUserValuesMutation = {
        firstName, lastName, middleName, password, email,
      };

      await createUserMutation(values).unwrap();
      setTimeout(() => {
        getFinalResult();
      }, 3000);
    } catch (err) {
      const error = err as GeneralError;
      const message = error?.data?.error?.message;
      if (message === ERROR_CATCH_USER_CREATED) {
        handleErrorText(ERROR_MESSAGE_EMAIL_EXISTS);
      }
      setTimeout(() => {
        getFinalResult();
      }, 3000);
    }
  };

  const goNext = (props: PersonalInfoFormValues | UserAndPasswordFormValues) => {
    updateData(props);
    goNextView();

    // This view means that the data is ready to be submitted.
    if (counterView === 1) {
      handleSubmit(formData.current);
    }
  };

  return (
    <Main>
      <MainContainer>
        <FormTitle variant="h1">Create account</FormTitle>
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
            onError={() => <ErrorCreateAccount error={errorText} resetCounterView={resetCounterView} />}
            onSuccess={() => <SuccessCreateAccount />}
          />
        )}
      </MainContainer>
    </Main>
  );
};

export { CreateAccount };
