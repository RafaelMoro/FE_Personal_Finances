export const TYPE_OF_ACCOUNTS = ['Credit', 'Debit', 'Food Voucher', 'Restaurant Voucher', 'Savings'] as const;

export interface CategoriesRecords {
  category: string;
  subCategories: string[];
}

const FOOD_AND_DRINK_CATEGORY: CategoriesRecords = {
  category: 'Food and Drink',
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
const HOUSING_CATEGORY: CategoriesRecords = {
  category: 'Housing',
  subCategories: [
    'Rent',
    'Mortgage',
    'Home maintenance and Repairs',
    'Property taxes',
  ],
};
const UTILITIES_CATEGORY: CategoriesRecords = {
  category: 'Utilities',
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
const SUSCRIPTIONS_CATEGORY: CategoriesRecords = {
  category: 'Subscriptions',
  subCategories: [
    'Streaming services',
    'Gym',
    'Software',
  ],
};
const TRANSPORTATION_CATEGORY: CategoriesRecords = {
  category: 'Transportation',
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
const DEBT_AND_LOANS_CATEGORY: CategoriesRecords = {
  category: 'Debt & Loans Payments',
  subCategories: [
    'Credit card debt',
    'Student loans',
    'Personal loans',
    'Funding',
    'Auto loan',
  ],
};
const INSURANCE_CATEGORY: CategoriesRecords = {
  category: 'Insurance',
  subCategories: [
    'Medical insurance',
    'Dental insurance',
    'Mortgage Insurance',
    'Card Insurance',
    'Property Insurance',
  ],
};
const HEALTHCARE_CATEGORY: CategoriesRecords = {
  category: 'HealthCare',
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
const KIDS_CATEGORY: CategoriesRecords = {
  category: 'Kids',
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
const CLOTHING_AND_PERSONAL_CARE: CategoriesRecords = {
  category: 'Clothing & Personal Care',
  subCategories: [
    'Clothes',
    'Haircuts',
    'Barber',
    'Footwear',
  ],
};

const ENTERTAINMENT_AND_LEISURE_CATEGORY: CategoriesRecords = {
  category: 'Entertainment and Leisure',
  subCategories: [
    'Go Out',
    'Hobbies',
    'Concerts',
    'Cinema',
  ],
};
const SAVINGS_CATEGORY: CategoriesRecords = {
  category: 'Savings',
  subCategories: [
    'Emergency Fund',
    'Retirement',
    'Investments',
    'Vacations',
    'New Car',
  ],
};

export const CATEGORIES_RECORDS: CategoriesRecords[] = [
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
