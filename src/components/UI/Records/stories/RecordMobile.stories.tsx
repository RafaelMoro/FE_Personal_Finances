import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Record } from '../Record';
import {
  expenseSample,expenseSampleWithLongShortName, ExpenseSampleWithoutTagsAndBudgets,
  ExpenseSampleWithManyBudgets, ExpenseSampleWithManyBudgetsAndLongNameBudget,
  ExpenseSampleWithManyBudgetsAndTags, ExpenseSampleWithNoBudgetsAndManyTags,
  IncomeSample, IncomeSampleWithExpensesPaid, expenseSampleWithLongDescription,
  backgroundColorDefault,
} from './Record.mocks';

export default {
  title: 'UI/Record/Mobile',
  component: Record,
} as ComponentMeta<typeof Record>;

const Template: ComponentStory<typeof Record> = (args) => (
  <div style={{ width: '365px', margin: '0 auto' }}>
    <Record {...args} />
  </div>
);

export const Expense = Template.bind({});
Expense.args = {
  record: expenseSample,
  backgroundColor: backgroundColorDefault,
};

export const ExpenseWithLongDescription = Template.bind({});
ExpenseWithLongDescription.args = {
  record: expenseSampleWithLongDescription,
  backgroundColor: backgroundColorDefault,
};

export const ExpenseWithLongShortName = Template.bind({});
ExpenseWithLongShortName.args = {
  record: expenseSampleWithLongShortName,
  backgroundColor: backgroundColorDefault,
};

export const ExpenseWithoutTagsAndBudgets = Template.bind({});
ExpenseWithoutTagsAndBudgets.args = {
  record: ExpenseSampleWithoutTagsAndBudgets,
  backgroundColor: backgroundColorDefault,
};

export const ExpenseWithManyBudgets = Template.bind({});
ExpenseWithManyBudgets.args = {
  record: ExpenseSampleWithManyBudgets,
  backgroundColor: backgroundColorDefault,
};

export const ExpenseWithManyBudgetsAndLongNameBudget = Template.bind({});
ExpenseWithManyBudgetsAndLongNameBudget.args = {
  record: ExpenseSampleWithManyBudgetsAndLongNameBudget,
  backgroundColor: backgroundColorDefault,
};

export const ExpenseWithManyBudgetsAndTags = Template.bind({});
ExpenseWithManyBudgetsAndTags.args = {
  record: ExpenseSampleWithManyBudgetsAndTags,
  backgroundColor: backgroundColorDefault,
};

export const ExpenseWithNoBudgetsAndManyTags = Template.bind({});
ExpenseWithNoBudgetsAndManyTags.args = {
  record: ExpenseSampleWithNoBudgetsAndManyTags,
  backgroundColor: backgroundColorDefault,
};

export const Income = Template.bind({});
Income.args = {
  record: IncomeSample,
  backgroundColor: backgroundColorDefault,
};

export const IncomeWithExpensesPaid = Template.bind({});
IncomeWithExpensesPaid.args = {
  record: IncomeSampleWithExpensesPaid,
  backgroundColor: backgroundColorDefault,
};
