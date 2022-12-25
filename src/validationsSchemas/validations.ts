import * as Yup from 'yup';

export const emailValidation = Yup.string().email('Invalid email').required('Email is required');
export const passwordValidation = Yup.string().required('Password is required');
export const createPasswordValidation = Yup.string()
  .required('New Password is required')
  .min(8, 'The password should be 8 characters minimum')
  .max(32, 'The password should be 32 characters maximum')
  .matches(/[A-Z]+/, 'The password should contain at least 1 capital letter')
  .matches(/[a-z]+/, 'The password should contain at least 1 lowercase letter')
  .matches(/[0-9]+/, 'The password should contain at least 1 number')
  .matches(/^\S*$/, 'The password should not contain white spaces')
  .matches(/[!@#$%^&*()[\]{}+*\-_.,;:/<>?=`~\\|']+/, 'The password should contain at least 1 special character');

export const confirmPasswordValidation = Yup.string()
  .required('Confirm Password is required')
  .oneOf([Yup.ref('password'), null], 'New Password and Confirm Password must match');
