export interface ICreateAccountValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  middleName?: string;
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
export interface IPersonalInformationProps {
  goNext: (props: PersonalInfoFormValues | UserAndPasswordFormValues) => void;
  counterView: number;
  direction: number;
}

export interface IUserAndPasswordProps {
  goNext: (props: UserAndPasswordFormValues | PersonalInfoFormValues) => void;
  goBack: () => void;
  counterView: number;
  direction: number;
}
