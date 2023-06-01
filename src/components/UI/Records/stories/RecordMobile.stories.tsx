import { withJotai } from 'storybook-addon-jotai';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { windowSizeAtom } from '../../../../atoms';
import { Record } from '../Record';

export default {
  title: 'UI/Record',
  component: Record,
  decorators: [withJotai]
} as ComponentMeta<typeof Record>;

const Template: ComponentStory<typeof Record> = (args) => (
  <div style={{ width: '365px', margin: '0 auto' }}>
    <Record {...args} />
  </div>
);

export const MobileIncome = Template.bind({});
MobileIncome.args = {
  _id: '456-789',
  shortName: 'Gym to home.',
  description: 'Paying Uber to return home',
  category: 'Transport',
  subCategory: 'Uber/Didi',
  tag: ['Important'],
  indebtedPeople: [],
  budgets: ['Transport'],
  formattedTime: '19:01pm',
  fullDate: 'May 14',
  amount: '$127.80',
  isPaid: false,
};

export const MobileIncomeWithLongDescription = Template.bind({});
MobileIncomeWithLongDescription.args = {
  _id: '456-789',
  shortName: 'Groceries for the week.',
  description: 'Eggs $42.5, Meat $182.8, Bananas $17.2, Avocado $36.34, Six Beers $116.31, Coca-cola $45, Mineral water $36, Chips $63, Erics juice $17, Cheese for two weeeks $230, fried chicken for the family $184.29',
  category: 'Food',
  subCategory: 'Groceries',
  tag: ['Important'],
  indebtedPeople: [],
  budgets: ['Food'],
  formattedTime: '15:31pm',
  fullDate: 'May 19',
  amount: '$970.44',
  isPaid: false,
};

export const MobileIncomeWithLongShortName = Template.bind({});
MobileIncomeWithLongShortName.args = {
  _id: '456-789',
  shortName: "McDonald's didi food 2 combos of $99 each. Rob owes me at Jan 31. Putting more words to see how does the short name behaves in this component. ",
  description: 'Paying Uber to go to a bar.',
  category: 'Food',
  subCategory: 'Groceries',
  tag: ['Important'],
  indebtedPeople: [],
  budgets: ['Food'],
  formattedTime: '05:21pm',
  fullDate: 'Feb 10',
  amount: '$67.43',
  isPaid: false,
};