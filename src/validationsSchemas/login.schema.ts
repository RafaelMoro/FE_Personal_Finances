import * as Yup from 'yup';
import {
  emailValidation, passwordValidation, confirmPasswordValidation,
  firstNameValidation, lastNameValidation, middleNameValidation,
} from './validations';

export const LoginSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation('Password is required', true),
});

export const ForgotPasswordSchema = Yup.object({
  email: emailValidation,
});

export const ResetPasswordSchema = Yup.object({
  password: passwordValidation('New Password is required'),
  confirmPassword: confirmPasswordValidation,
});

export const PersonalInformationSchema = Yup.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  middleName: middleNameValidation,
});

export const UserAndPasswordSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation('Password is required'),
  confirmPassword: confirmPasswordValidation,
});
