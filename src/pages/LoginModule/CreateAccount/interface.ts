import { ReactNode } from 'react';

export interface CreateUserValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  middleName?: string;
}

export interface GoNextProps {
  data: PersonalInfoFormValues | UserAndPasswordFormValues;
  skipUpdateData: boolean;
  shouldSubmitForm: boolean;
}

export interface CreateUserValuesMutation extends Omit<CreateUserValues, 'confirmPassword'> {}
export interface CreateLocalCategoriesProps {
  sub: string;
}

export interface PersonalInfoFormValues {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface UserAndPasswordFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
export interface PersonalInformationProps {
  goNext: (props: GoNextProps) => void;
  counterView: number;
  direction: number;
}

export interface UserAndPasswordProps {
  goNext: (props: GoNextProps) => void;
  goBack: () => void;
  counterView: number;
  direction: number;
}

export interface LoadingCreateAccountProps {
  counterView: number;
  direction: number;
}

export interface ErrorCreateAccountProps {
  error: string;
  resetCounterView: () => void;
}

export interface CreateAccountResultProps {
  direction: number;
  counterView: number;
  isError: boolean;
  onError: () => ReactNode;
  onSuccess: () => ReactNode;
}
