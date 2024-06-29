import { Account } from '../../../globalInterface';
import { AMERICAN_EXPRESS_ID, CITIBANAMEX_DEBIT_ID } from '../../../hooks/useGuestUser/constants';
import { AccountUI } from './Account.interface';

export const mockedAccountsUI: AccountUI[] = [
  {
    _id: '1',
    __v: 0,
    title: 'Bank account 1',
    amount: 20000,
    amountFormatted: '$20,000.00',
    accountType: 'Debit',
    backgroundColor: 'red',
    color: 'white',
    backgroundColorUI: { name: 'red', color: 'red' },
    colorUI: { name: 'white', color: 'white' },
    selected: true,
  },
  {
    _id: '2',
    __v: 0,
    title: 'Bank account 2',
    amount: 30000,
    amountFormatted: '$30,000.00',
    accountType: 'Credit',
    backgroundColor: 'blue',
    color: 'white',
    backgroundColorUI: { name: 'blue', color: 'blue' },
    colorUI: { name: 'white', color: 'white' },
    selected: false,
  },
];

export const mockedAccounts: Account[] = [
  {
    _id: CITIBANAMEX_DEBIT_ID,
    __v: 0,
    title: 'Citibanamex Debit',
    amount: 8246.41,
    accountType: 'Debit',
    backgroundColor: 'Blue',
    color: 'White',
  },
  {
    _id: AMERICAN_EXPRESS_ID,
    __v: 0,
    title: 'American Express',
    amount: 80000,
    accountType: 'Credit',
    backgroundColor: 'Tomato',
    color: 'Black',
  },
];
