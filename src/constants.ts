// eslint-disable-next-line import/no-cycle
import { Category } from './components/UI/Records/interface';

export const TYPE_OF_ACCOUNTS = ['Credit', 'Debit', 'Food Voucher', 'Restaurant Voucher', 'Savings'] as const;

const FOOD_AND_DRINK_CATEGORY: Category = {
  _id: 'local-category-1',
  __v: 0,
  categoryName: 'Food and Drink',
  subCategories: [
    'Bar',
    'Alcohol',
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
    'Phone',
    'Cellphone',
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
    'Car maintenance and repair',
    'Auto insurance',
    'Parking fees',
    'Public Transportation',
    'Uber/Didi',
    'Airplane tickets',
    'Taxis',
  ],
};
const DEBT_AND_LOANS_CATEGORY: Category = {
  _id: 'local-category-6',
  __v: 0,
  categoryName: 'Debt & Loans Payments',
  subCategories: [
    'Credit card debt',
    'Student loans',
    'Personal loans',
    'Funding',
    'Auto loan',
  ],
};
const INSURANCE_CATEGORY: Category = {
  _id: 'local-category-7',
  __v: 0,
  categoryName: 'Insurance',
  subCategories: [
    'Medical insurance',
    'Dental insurance',
    'Mortgage Insurance',
    'Card Insurance',
    'Property Insurance',
  ],
};
const HEALTHCARE_CATEGORY: Category = {
  _id: 'local-category-8',
  __v: 0,
  categoryName: 'HealthCare',
  subCategories: [
    'Speciality Care',
    'Dental care',
    'Urgent care',
    'Medicines',
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
    'Baby necessities',
    'Tuition (private school)',
    'School supplies',
    'School lunch',
    'Extra-curricular activities',
    'Tutoring',
    'Kids clothing',
    'Footwear',
  ],
};
const CLOTHING_AND_PERSONAL_CARE: Category = {
  _id: 'local-category-10',
  __v: 0,
  categoryName: 'Clothing & Personal Care',
  subCategories: [
    'Clothes',
    'Haircuts',
    'Barber',
    'Footwear',
  ],
};

const ENTERTAINMENT_AND_LEISURE_CATEGORY: Category = {
  _id: 'local-category-11',
  __v: 0,
  categoryName: 'Entertainment and Leisure',
  subCategories: [
    'Go Out',
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
    'Emergency Fund',
    'Retirement',
    'Investments',
    'Vacations',
    'New Car',
  ],
};

export const CATEGORIES_RECORDS: Category[] = [
  FOOD_AND_DRINK_CATEGORY,
  HOUSING_CATEGORY,
  UTILITIES_CATEGORY,
  SUSCRIPTIONS_CATEGORY,
  TRANSPORTATION_CATEGORY,
  DEBT_AND_LOANS_CATEGORY,
  INSURANCE_CATEGORY,
  HEALTHCARE_CATEGORY,
  KIDS_CATEGORY,
  CLOTHING_AND_PERSONAL_CARE,
  ENTERTAINMENT_AND_LEISURE_CATEGORY,
  SAVINGS_CATEGORY,
];
