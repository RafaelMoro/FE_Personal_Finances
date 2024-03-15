import { Category } from './globalInterface';

export const BACKEND_ENV_URI = process.env.REACT_APP_BACKEND_URI;
export const BACKEND_LOCAL_URI = 'http://localhost:6006/';
export const POST_METHOD = 'POST';
export const PUT_METHOD = 'PUT';
export const DELETE_METHOD = 'DELETE';

/** Errors */
export const NETWORK_CATCH_ERROR = 'Network Error';
export const JWT_EXPIRED_CATCH_ERROR = 'jwt expired';
export const ERROR_CATCH_USER_CREATED = 'Try with other email.';

export const ERROR_TITLE_GENERAL = 'Error';
export const ERROR_MESSAGE_GENERAL = 'Oops! Something went wrong. Try again later.';
export const NETWORK_ERROR_MESSAGE = 'There is a network error. Please check you are connected to Internet.';

/** Errors Login Module */
export const USER_NOT_FOUND_CATCH_ERROR = 'User not found.';
export const TOKEN_EXPIRED_TITLE = 'Your token to reset your password has expired';
export const TOKEN_EXPIRED_DESC = 'Redirecting you to forgot password to try again.';
export const UNAUTHORIZED_ERROR = 'Email or Password incorrect.';
export const ERROR_MESSAGE_UNAUTHORIZED = 'Email or Password incorrect.';
export const ERROR_MESSAGE_EMAIL_EXISTS = 'The email entered is registered to other user. Please try with a different email.';

export const ERROR_MESSAGE_FETCH_CATEGORIES = 'We could not get your categories. Please try again later';
export const ERROR_CREATE_LOCAL_CATEGORIES = 'We could not create your categories. Please try again later';
export const ERROR_INCORRECT_MAIL_DESC = 'Verify that your email is correct or create an account.';

/** Success Login Module */
export const SUCCESS_PASSWORD_RESET_TITLE = 'Password reset successfully';
export const SUCCESS_PASSWORD_RESET_DESC = 'You may login with your new password.';
export const SUCCESS_FORGOT_PASSWORD_TITLE = 'Email Sent.';
export const SUCCESS_FORGOT_PASSWORD_DESC = 'Kindly check your email inbox and follow the instructions. Redirecting to sign in page';

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December'];
export const ZERO_CURRENCY = '$0.00';

const FOOD_AND_DRINK_CATEGORY: Category = {
  _id: 'local-category-1',
  __v: 0,
  categoryName: 'Food and Drink',
  subCategories: [
    'Bar',
    'Alcohol & Cigarettes',
    'Takeout',
    'Fast Food',
    'Cofee shops',
    'Restaurants',
    'Groceries',
  ],
  icon: 'foodAndDrink',
};

export const CATEGORIES_RECORDS: Category[] = [
  FOOD_AND_DRINK_CATEGORY,
];
