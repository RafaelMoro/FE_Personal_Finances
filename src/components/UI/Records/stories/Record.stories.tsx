import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Expense } from '../Expense';

export default {
  title: 'UI/Expense',
  component: Expense
} as ComponentMeta<typeof Expense>;

const Template: ComponentStory<typeof Expense> = (args) => (
  <Expense {...args} />
);

export const MorningRecord = Template.bind({});
MorningRecord.args = {
  shortName: 'Uber home to gym.',
  description: 'Paying Uber to go to smartfit on Solesta',
  amount: '$109.95',
  fullDate: 'May 14',
  formattedTime: '17:16pm',
  category: 'Transport',
  subCategory: 'Uber/Didi',
  tag: ['Paid'],
  indebtedPeople: [],
  budgets: ['Transport'],
};

// export const EveningRecord = Template.bind({});
// EveningRecord.args = {
//   shortName: 'Uber home to bar.',
//   description: 'Paying Uber to go to a bar.',
//   recordType: 'Expense',
//   date: new Date('February 10, 2023 17:21:18'),
//   price: 67.43,
// };

// export const LongShortNameRecord = Template.bind({});
// LongShortNameRecord.args = {
//   shortName: "McDonald's didi food 2 combos of $99 each. Rob owes me at Jan 31. Putting more words to see how does the short name behaves in this component. ",
//   description: 'Paying Uber to go to a bar.',
//   recordType: 'Expense',
//   date: new Date('February 10, 2023 17:21:18'),
//   price: 67.43,
// };

// export const LongDescriptionRecord = Template.bind({});
// LongDescriptionRecord.args = {
//   shortName: "McDonald's didi food 2 combos of $99 each. ",
//   description: "Going to Mcdonald's with Eric for 2 combos of $99 each. Robb owes me $198 still on Feb 16. He'll check if he can pay me next paycheck. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, nemo exercitationem a voluptas eveniet quod inventore nulla aliquid delectus porro nostrum, quis accusamus minus consectetur ea natus ipsum quae sunt?",
//   recordType: 'Expense',
//   date: new Date('February 10, 2023 17:21:18'),
//   price: 67.43,
// };

// export const IncomeRecord = Template.bind({});
// IncomeRecord.args = {
//   shortName: 'Payment',
//   description: 'Paying $2100',
//   recordType: 'Income',
//   date: new Date('February 10, 2023 17:21:18'),
//   price: 2100,
// };

// export const IncomeRecordWithExpenses = Template.bind({});
// IncomeRecordWithExpenses.args = {
//   shortName: 'Payment Feb 01 - 15.',
//   description: 'Paying every expense within this timeframe',
//   recordType: 'Income',
//   date: new Date('February 10, 2023 17:21:18'),
//   price: 1234.69,
//   linkedPayedRecords: payedRecords
// };

// export const IncomeRecordExpandedWithExpenses = Template.bind({});
// IncomeRecordExpandedWithExpenses.args = {
//   shortName: 'Payment Feb 01 - 15.',
//   description: 'Paying every expense within this timeframe',
//   recordType: 'Income',
//   date: new Date('February 10, 2023 17:21:18'),
//   price: 1234.69,
//   linkedPayedRecords: payedRecords,
//   shortView: false,
// };
