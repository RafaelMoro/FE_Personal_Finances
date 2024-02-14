import { Category } from './globalInterface';

export const BACKEND_ENV_URI = process.env.REACT_APP_BACKEND_URI;
export const BACKEND_LOCAL_URI = 'http://localhost:6006/';
export const POST_METHOD = 'POST';

/** Errors */
export const NETWORK_CATCH_ERROR = 'Network Error';
export const JWT_EXPIRED_CATCH_ERROR = 'jwt expired';

export const ERROR_TITLE_GENERAL = 'Error';
export const ERROR_MESSAGE_GENERAL = 'Oops! Something went wrong. Try again later.';
export const NETWORK_ERROR_MESSAGE = 'There is a network error. Please check you are connected to Internet.';

/** Errors Login Module */
export const USER_NOT_FOUND_CATCH_ERROR = 'User not found.';
export const TOKEN_EXPIRED_TITLE = 'Your token to reset your password has expired';
export const TOKEN_EXPIRED_DESC = 'Redirecting you to forgot password to try again.';
export const UNAUTHORIZED_ERROR = 'Email or Password incorrect.';
export const ERROR_MESSAGE_UNAUTHORIZED = 'Email or Password incorrect.';

export const ERROR_MESSAGE_FETCH_CATEGORIES = 'We could not get your categories. Please try again later';
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
};
const HOUSING_CATEGORY: Category = {
  _id: 'local-category-2',
  __v: 0,
  categoryName: 'Housing',
  subCategories: [
    'Rent',
    'Mortgage',
    'Home maintenance and Repairs',
    'Property taxes',
  ],
};
const UTILITIES_CATEGORY: Category = {
  _id: 'local-category-3',
  __v: 0,
  categoryName: 'Utilities',
  subCategories: [
    'Electricity',
    'Gas',
    'Heating',
    'Water',
    'Internet',
    'Cable',
    'Mobile communication',
    'Safety',
  ],
};
const SUSCRIPTIONS_CATEGORY: Category = {
  _id: 'local-category-4',
  __v: 0,
  categoryName: 'Subscriptions',
  subCategories: [
    'Streaming services',
    'Gym',
    'Software',
  ],
};
const TRANSPORTATION_CATEGORY: Category = {
  _id: 'local-category-5',
  __v: 0,
  categoryName: 'Transportation',
  subCategories: [
    'Gas/Fuel',
    'Car Rental',
    'Car maintenance and repair',
    'Parking fees',
    'Public Transportation',
    'Uber/Didi',
    'Airplane tickets',
    'Taxi',
  ],
};
const DEBT_AND_LOANS_CATEGORY: Category = {
  _id: 'local-category-6',
  __v: 0,
  categoryName: 'Financial Expenses',
  subCategories: [
    'Counselling / Guidance',
    'Family',
    'Goverment fee/payment',
    'Bank Charges / fees',
    'Fines / Penalties',
    'Taxes',
    'Credit card debt',
    'Auto insurance / Car Loan',
    'Loan',
    'Payment',
    'Personal loan',
    'Funding',
    'Insurance',
  ],
};
const HEALTHCARE_CATEGORY: Category = {
  _id: 'local-category-8',
  __v: 0,
  categoryName: 'Health and Personal Care',
  subCategories: [
    'Barber',
    'Therapist / Mental Health',
    'Speciality Care',
    'Dental care',
    'Urgent care',
    'Medicines',
    'Hospital',
    'Prescriptions',
    'Out of pocket costs for primary care',
    'Health supplements',
  ],
};
const KIDS_CATEGORY: Category = {
  _id: 'local-category-9',
  __v: 0,
  categoryName: 'Kids',
  subCategories: [
    'Child support',
    'Necessities',
    'Tuition / Tutoring',
    'Toys',
    'Gifts',
    'School supplies / lunch',
    'Extra-curricular activities',
    'Go out',
    'Clothing',
    'Footwear',
  ],
};
const CLOTHING_AND_PERSONAL_CARE: Category = {
  _id: 'local-category-10',
  __v: 0,
  categoryName: 'Shopping',
  subCategories: [
    'Clothes',
    'Footwear',
    'Kids',
    'House / Garden',
    'Electronics / accesories',
    'Videogames',
    'Software',
    'Pharmacy',
    'Jewerly / accesories',
    'Pets',
    'Stationery / tools',
    'Gifts',
    'Health and beauty',
    'Free time / Hobbies',
  ],
};

const ENTERTAINMENT_AND_LEISURE_CATEGORY: Category = {
  _id: 'local-category-11',
  __v: 0,
  categoryName: 'Entertainment and Leisure',
  subCategories: [
    'Go Out',
    'Wellness and beauty',
    'Charity / Gifts',
    'Sports events / Culture',
    'Sports / Fitness',
    'Education / Personal development',
    'Special events',
    'Books, audiobooks',
    'Lottery / Gambling',
    'Vacations / Hotel',
    'Hobbies',
    'Concerts',
    'Cinema',
  ],
};
const SAVINGS_CATEGORY: Category = {
  _id: 'local-category-12',
  __v: 0,
  categoryName: 'Savings',
  subCategories: [
    'Savings',
    'Collectible',
    'Emergency Fund',
    'Retirement',
    'Investments',
    'Vacations',
    'Car / Real property ',
  ],
};

export const CATEGORIES_RECORDS: Category[] = [
  FOOD_AND_DRINK_CATEGORY,
  HOUSING_CATEGORY,
  UTILITIES_CATEGORY,
  SUSCRIPTIONS_CATEGORY,
  TRANSPORTATION_CATEGORY,
  DEBT_AND_LOANS_CATEGORY,
  HEALTHCARE_CATEGORY,
  KIDS_CATEGORY,
  CLOTHING_AND_PERSONAL_CARE,
  ENTERTAINMENT_AND_LEISURE_CATEGORY,
  SAVINGS_CATEGORY,
];
