import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Account } from '../Account';
import { AccountUI } from '../Account.interface';

export default {
  title: 'UI/Account',
  component: Account
} as ComponentMeta<typeof Account>;

const Template: ComponentStory<typeof Account> = (args) => (
  <div style={{ width: '250px' }}>
    <Account {...args} />
  </div>
);

interface IAccountsMock {
  normalAccount: AccountUI,
  accountWithBigAmount: AccountUI,
  otherAccount: AccountUI,
  accountWithBigTitle: AccountUI,
  accountWithDecimal: AccountUI,
  accountSelected: AccountUI,
}

const accountsMock: IAccountsMock = {
  normalAccount: {
    _id: '1234',
    __v: 0,
    title: 'BBVA',
    amount: 25000,
    amountFormatted: '$25,000.00',
    accountType: 'Debit',
    backgroundColor: 'blue',
    color: 'white',
    backgroundColorUI: { name: 'blue', color: 'blue' },
    colorUI: { name: 'white', color: 'white' },
    selected: false,
  },
  accountWithBigAmount: {
    _id: '1234',
    __v: 0,
    title: 'Santander premium',
    amount: 25000000000,
    amountFormatted: '$25,000,000,000.00',
    accountType: 'Debit',
    backgroundColor: 'blue',
    color: 'white',
    backgroundColorUI: { name: 'blue', color: 'blue' },
    colorUI: { name: 'white', color: 'white' },
    selected: false,
  },
  otherAccount: {
    _id: '1234',
    __v: 0,
    title: 'HSBC 2now',
    amount: 38000,
    amountFormatted: '$38,000.00',
    accountType: 'Credit',
    backgroundColor: 'grey',
    color: 'black',
    backgroundColorUI: { name: 'grey', color: 'grey' },
    colorUI: { name: 'black', color: 'black' },
    selected: false,
  },
  accountWithBigTitle: {
    _id: '1234',
    __v: 0,
    title: 'Citibanamex Costco Credit Card And More Words to See How Many Handles',
    amount: 38000,
    amountFormatted: '$38,000.00',
    accountType: 'Credit',
    backgroundColor: 'purple',
    color: 'white',
    backgroundColorUI: { name: 'purple', color: 'purple' },
    colorUI: { name: 'white', color: 'white' },
    selected: false,
  },
  accountWithDecimal: {
    _id: '1234',
    __v: 0,
    title: 'Sodexo platinum',
    amount: 1350.78,
    amountFormatted: '$1,350.78',
    accountType: 'Food Voucher',
    backgroundColor: 'black',
    color: 'white',
    backgroundColorUI: { name: 'black', color: 'black' },
    colorUI: { name: 'white', color: 'white' },
    selected: false,
  },
  accountSelected: {
    _id: '1234',
    __v: 0,
    title: 'Santander',
    amount: 1350.78,
    amountFormatted: '$1,350.78',
    accountType: 'Debit',
    backgroundColor: 'red',
    color: 'white',
    backgroundColorUI: { name: 'red', color: 'red' },
    colorUI: { name: 'white', color: 'white' },
    selected: true,
  }
}
export const NormalAccount = Template.bind({});
NormalAccount.args = {
  account: accountsMock.normalAccount,
  selectAccountOnClick: () => {},
  openModifyAccountModal: () => {},
};

export const AccountWithReallyBigNumber = Template.bind({});
AccountWithReallyBigNumber.args = {
  account: accountsMock.accountWithBigAmount,
  selectAccountOnClick: () => {},
  openModifyAccountModal: () => {},
};

export const OtherAccount = Template.bind({});
OtherAccount.args = {
  account: accountsMock.otherAccount,
  selectAccountOnClick: () => {},
  openModifyAccountModal: () => {},
};

export const AccountWithBigTitle = Template.bind({});
AccountWithBigTitle.args = {
  account: accountsMock.accountWithBigTitle,
  selectAccountOnClick: () => {},
  openModifyAccountModal: () => {},
};

export const AccountWithDecimals = Template.bind({});
AccountWithDecimals.args = {
  account: accountsMock.accountWithDecimal,
  selectAccountOnClick: () => {},
  openModifyAccountModal: () => {},
}

export const AccountSelected = Template.bind({});
AccountSelected.args = {
  account: accountsMock.accountSelected,
  selectAccountOnClick: () => {},
  openModifyAccountModal: () => {},
}
