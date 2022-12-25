import * as Yup from 'yup';
import {
  emailValidation, passwordValidation, createPasswordValidation, confirmPasswordValidation,
} from './validations';

export const LoginSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export const ForgotPasswordSchema = Yup.object({
  email: emailValidation,
});

export const ResetPasswordSchema = Yup.object({
  password: createPasswordValidation,
  confirmPassword: confirmPasswordValidation,
});
