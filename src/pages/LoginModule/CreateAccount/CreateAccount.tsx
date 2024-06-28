/* eslint-disable react/no-unstable-nested-components */
import {
  ReactElement, useRef, useState,
} from 'react';

import { ERROR_MESSAGE_GENERAL, ERROR_MESSAGE_EMAIL_EXISTS, ERROR_CATCH_USER_CREATED } from '../../../constants';
import {
  CreateUserValues, CreateUserValuesMutation, GoNextProps, PersonalInfoFormValues, UserAndPasswordFormValues,
} from './interface';
import { GeneralError } from '../../../globalInterface';
import { useCreateLocalCategoriesMutation, useCreateUserMutation } from '../../../redux/slices/User/actions/createUser';
import { useAnimateBox } from '../../../hooks/useAnimateBox';

import {
  CreateAccountResult, SuccessCreateAccount, ErrorCreateAccount, LoadingCreateAccount,
} from './CreateAccountResult';
import { PersonalInformation } from './PersonalInformation';
import { UserAndPassword } from './UserAndPassword';
import {
  Main, MainContainer, FormTitle, FormDescription,
} from '../../../styles/LoginModule.styled';
import { saveInfoToLocalStorage } from '../../../utils';
import { useLogin } from '../../../hooks';

const initialValuesCreateAccountForm = {
  email: '',
  firstName: '',
  middleName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

const CreateAccount = ():ReactElement => {
  const { resetUserGuestLocalStorage } = useLogin();
  const [createUserMutation, { isLoading: isLoadingUser, isError: isErrorUser }] = useCreateUserMutation();
  const [createLocalCategoriesMutation, { isLoading: isLoadingCategories, isError: isErrorCategories }] = useCreateLocalCategoriesMutation();
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
      // First reset local storage if we have guest user logged in.
      saveInfoToLocalStorage({});
      // Reset from redux all information of the guest user
      resetUserGuestLocalStorage();
      // Omitting confirmPassword value as it's not needed.
      const {
        firstName, lastName, middleName, password, email,
      } = valuesReceived;
      const values: CreateUserValuesMutation = {
        firstName, lastName, middleName, password, email,
      };

      const responseCreateUser = await createUserMutation(values).unwrap();
      const { data: { userCreated: { sub } } } = responseCreateUser;
      await createLocalCategoriesMutation({ sub }).unwrap();
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

  const goNext = ({ data, shouldSubmitForm = false, skipUpdateData = true }: GoNextProps) => {
    if (!skipUpdateData) updateData(data);
    if (shouldSubmitForm) handleSubmit(formData.current);
    goNextView();
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
        { (!isLoadingUser || isLoadingCategories) && (
          <CreateAccountResult
            counterView={counterView}
            direction={direction}
            isError={isErrorCategories || isErrorUser}
            onError={() => <ErrorCreateAccount error={errorText} resetCounterView={resetCounterView} />}
            onSuccess={() => <SuccessCreateAccount />}
          />
        )}
      </MainContainer>
    </Main>
  );
};

export { CreateAccount };
