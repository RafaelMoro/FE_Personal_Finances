import * as Yup from 'yup';
import { emailValidation, passwordValidation } from './validations';

export const LoginSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export const ForgotPasswordSchema = Yup.object({
  email: emailValidation,
});
