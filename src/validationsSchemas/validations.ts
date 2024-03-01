import * as Yup from 'yup';

// General validations
export const stringRequired = (message: string) => Yup.string().required(message);

export const emailValidation = Yup.string().email('Invalid email').required('Email is required');
export const firstNameValidation = Yup.string().required('First name is required').min(2);
export const lastNameValidation = Yup.string().required('Last name is required').min(2);
export const middleNameValidation = Yup.string().min(2);

export const confirmPasswordValidation = Yup.string()
  .required('Confirm Password is required')
  .oneOf([Yup.ref('password'), null], 'New Password and Confirm Password must match');

export const passwordValidation = (requiredMessage: string, onlyRequired = false) => {
  if (onlyRequired) return Yup.string().required(requiredMessage);
  return Yup.string()
    .required(requiredMessage)
    .min(8, 'The password should be 8 characters minimum')
    .max(32, 'The password should be 32 characters maximum')
    .matches(/[A-Z]+/, 'The password should contain at least 1 capital letter')
    .matches(/[a-z]+/, 'The password should contain at least 1 lowercase letter')
    .matches(/[0-9]+/, 'The password should contain at least 1 number')
    .matches(/^\S*$/, 'The password should not contain white spaces')
    .matches(/[!@#$%^&*()[\]{}+*\-_.,;:/<>?=`~\\|']+/, 'The password should contain at least 1 special character');
};

//  ****** Account validations

export const accountTitleValidation = Yup.string().required('The title of your account is required.');
export const accountAmountValidation = Yup.string().required('The initial amount of your account is required.');

/** Record validations  */
export const tagOrBudgetValidation = (message: string) => Yup.string().min(3).max(20).required(message);
export const tagOrBudgetValidationRequired = Yup.string().min(3).max(20).required();
export const indebtedName = Yup.string().min(3, 'Full name must be at least 3 characters.').required('Full name is required');
export const indebtedIsPaid = Yup.boolean().required();
