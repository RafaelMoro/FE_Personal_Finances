import * as Yup from 'yup';

export const emailValidation = Yup.string().email('Invalid email').required('Email is required');
export const passwordValidation = Yup.string().required('Password is required');
