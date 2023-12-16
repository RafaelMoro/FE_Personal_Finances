import { Category } from './globalInterface';

/** Errors */
export const NETWORK_CATCH_ERROR = 'Network Error';
export const UNAUTHORIZED_ERROR = 'Request failed with status code 401';
export const ERROR_MESSAGE_UNAUTHORIZED = 'Email or Password incorrect.';
export const ERROR_MESSAGE_GENERAL = 'Oops! Something went wrong. Try again later.';

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
