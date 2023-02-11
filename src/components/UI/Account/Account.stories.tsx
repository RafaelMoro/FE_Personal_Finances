import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Account } from "./Account";

export default {
  title: 'UI/Account',
  component: Account
} as ComponentMeta<typeof Account>;

const Template: ComponentStory<typeof Account> = (args) => (
  <div style={{ width: '200px' }}>
    <Account {...args} />
  </div>
);

export const NormalAccount = Template.bind({});
NormalAccount.args = {
  title: 'BBVA',
  amount: 25000,
  accountType: 'Debit',
  bgColor: 'blue',
  color: 'white',
};

export const OtherAccount = Template.bind({});
OtherAccount.args = {
  title: 'HSBC 2now',
  amount: 38000,
  accountType: 'Credit',
  bgColor: 'grey',
  color: 'white',
};

export const AccountWithBigTitle = Template.bind({});
AccountWithBigTitle.args = {
  title: 'Citibanamex Costco Credit Card And More Words to See How Many Handles',
  amount: 38000,
  accountType: 'Credit',
  bgColor: 'purple',
  color: 'white',
};

export const AccountWithDecimals = Template.bind({});
AccountWithDecimals.args = {
  title: 'Sodexo platinum',
  amount: 1350.78,
  accountType: 'Food Voucher',
  bgColor: 'black',
  color: 'white',
}

export const AccountSelected = Template.bind({});
AccountSelected.args = {
  title: 'Santander',
  amount: 1350.78,
  accountType: 'Debit',
  bgColor: 'red',
  color: 'white',
  selected: true,
}
