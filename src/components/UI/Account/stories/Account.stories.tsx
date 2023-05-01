import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Account } from '../Account';
import { AccountUI } from '../interface';

export default {
  title: 'UI/Account',
  component: Account
} as ComponentMeta<typeof Account>;

const Template: ComponentStory<typeof Account> = (args) => (
  <div style={{ width: '200px' }}>
    <Account {...args} />
  </div>
);

interface IAccountsMock {
  normalAccount: AccountUI,
  otherAccount: AccountUI,
  accountWithBigTitle: AccountUI,
  accountWithDecimal: AccountUI,
  accountSelected: AccountUI,
}

const accountsMock: IAccountsMock = {
  normalAccount: {
    _id: '1234',
    title: 'BBVA',
    amount: '$25,000.00',
    accountType: 'Debit',
    backgroundColor: { name: 'blue', color: 'blue' },
    color: { name: 'white', color: 'white' },
    selected: false,
  },
  otherAccount: {
    _id: '1234',
    title: 'HSBC 2now',
    amount: '$38,000.00',
    accountType: 'Credit',
    backgroundColor: { name: 'grey', color: 'grey' },
    color: { name: 'white', color: 'white' },
    selected: false,
  },
  accountWithBigTitle: {
    _id: '1234',
    title: 'Citibanamex Costco Credit Card And More Words to See How Many Handles',
    amount: '$38,000.00',
    accountType: 'Credit',
    backgroundColor: { name: 'purple', color: 'purple' },
    color: { name: 'white', color: 'white' },
    selected: false,
  },
  accountWithDecimal: {
    _id: '1234',
    title: 'Sodexo platinum',
    amount: '$1,350.78',
    accountType: 'Food Voucher',
    backgroundColor: { name: 'black', color: 'black' },
    color: { name: 'white', color: 'white' },
    selected: false,
  },
  accountSelected: {
    _id: '1234',
    title: 'Santander',
    amount: '$1,350.78',
    accountType: 'Debit',
    backgroundColor: { name: 'red', color: 'red' },
    color: { name: 'white', color: 'white' },
    selected: true,
  }
}
export const NormalAccount = Template.bind({});
NormalAccount.args = {
  account: accountsMock.normalAccount,
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
