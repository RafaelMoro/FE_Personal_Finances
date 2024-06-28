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
