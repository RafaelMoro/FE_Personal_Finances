import { Account, RecordRedux, User } from '../../globalInterface';
import { AMERICAN_EXPRESS_ID, CITIBANAMEX_DEBIT_ID } from './constants';
import { formatMockDate } from './utils';

const useGuestUserMocks = () => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const { currentDate, formattedTime: currentTime } = formatMockDate(today);
  const { currentDate: dateYesterday, formattedTime: yesterdayTime } = formatMockDate(yesterday);

  const guestUser: User = {
    accessToken: '',
    bearerToken: '',
    user: {
      email: '',
      firstName: 'Guest',
      lastName: 'User',
      middleName: '',
      sub: '123-456-789',
    },
  };

  const accounts: Account[] = [
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

  const recordsAmericanExpress: RecordRedux[] = [
    {
      _id: '456-789',
      userId: '123-456-789',
      shortName: 'Uber home to gym.',
      typeOfRecord: 'expense',
      description: 'Paying Uber to go to smartfit on Solesta',
      category: {
        _id: '9478-6123',
        categoryName: 'Transport',
        icon: 'transportation',
        __v: 0,
        subCategories: ['Uber/Didi'],
      },
      date: today.toISOString(),
      account: '5678',
      subCategory: 'Uber/Didi',
      tag: ['Important'],
      indebtedPeople: [],
      budgets: ['Transport'],
      formattedTime: currentTime,
      fullDate: currentDate,
      amount: 15.49,
      amountFormatted: '$15.49',
      isPaid: false,
    },
    {
      _id: '456-789-46516-789',
      userId: '123-456-789',
      shortName: 'Pizza with friends',
      typeOfRecord: 'expense',
      description: 'Dominator with Pepsi and bacon cheese sticks',
      category: {
        _id: '9478-6123-3147',
        categoryName: 'Food and Drink',
        icon: 'foodAndDrink',
        __v: 0,
        subCategories: ['Fast Food'],
      },
      date: yesterday.toISOString(),
      account: '5678',
      subCategory: 'Fast Food',
      tag: [],
      indebtedPeople: [
        {
          name: 'Michael',
          amount: '11.99',
          amountPaid: '0',
          isPaid: false,
          _id: '666b327f3169e5074652192b',
        },
        {
          name: 'John',
          amount: '20',
          amountPaid: '10',
          isPaid: false,
          _id: '666b327f3169e5074652192c',
        },
        {
          name: 'Rick',
          amount: '15',
          amountPaid: '15',
          isPaid: true,
          _id: '666b327f3169e5074652192d',
        },
      ],
      budgets: ['Fast Food'],
      formattedTime: yesterdayTime,
      fullDate: dateYesterday,
      amount: 47.88,
      amountFormatted: '$47.88',
      isPaid: false,
    },
    {
      transferRecord: {
        transferId: '665c91a10',
        account: '1234',
      },
      _id: '665c91a1094',
      userId: '123-456-789',
      shortName: 'Payment',
      typeOfRecord: 'transfer',
      description: '',
      amount: 76,
      amountFormatted: '$76.00',
      date: today.toISOString(),
      fullDate: currentDate,
      formattedTime: currentTime,
      category: {
        _id: '65f3b41b7c',
        categoryName: 'Financial Expenses',
        icon: 'debtAndLoans',
        subCategories: ['Credit card debt'],
        __v: 0,
      },
      subCategory: 'Credit card debt',
      tag: [],
      indebtedPeople: [],
      account: '5678',
      budgets: [],
      expensesPaid: [
        {
          _id: '456-789-7831-4685',
          shortName: 'Netflix',
          amount: 15.49,
          isPaid: true,
          amountFormatted: '$15.49',
          fullDate: dateYesterday,
          formattedTime: yesterdayTime,
        },
      ],
    },
    {
      _id: '456-789-7831-4685',
      userId: '123-456-789',
      shortName: 'Netflix',
      typeOfRecord: 'expense',
      description: '',
      category: {
        _id: '9478-6123-9832',
        categoryName: 'Subscriptions',
        icon: 'subcriptions',
        __v: 0,
        subCategories: ['Streaming services'],
      },
      date: yesterday.toISOString(),
      account: '5678',
      subCategory: 'Streaming services',
      tag: [],
      indebtedPeople: [],
      budgets: [],
      formattedTime: yesterdayTime,
      fullDate: dateYesterday,
      amount: 15.49,
      amountFormatted: '$15.49',
      isPaid: true,
    },
  ];

  const recordsDebitAccount: RecordRedux[] = [
    {
      transferRecord: {
        transferId: '665c91a10',
        account: '5678',
      },
      _id: '665c91a1094',
      userId: '123-456-789',
      shortName: 'Payment',
      typeOfRecord: 'transfer',
      description: '',
      amount: 76,
      amountFormatted: '$76.00',
      date: today.toISOString(),
      fullDate: currentDate,
      formattedTime: currentTime,
      category: {
        _id: '65f3b41b7c46232bf19e7bda',
        categoryName: 'Financial Expenses',
        icon: 'debtAndLoans',
        subCategories: ['Credit card debt'],
        __v: 0,
      },
      subCategory: 'Credit card debt',
      tag: [],
      indebtedPeople: [],
      account: '1234',
      budgets: [],
      isPaid: true,
    },
  ];

  return {
    guestUser,
    accounts,
    recordsAmericanExpress,
    recordsDebitAccount,
  };
};

export { useGuestUserMocks };
