import { withJotai } from 'storybook-addon-jotai';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { windowSizeAtom } from '../../../../atoms';
import { Record } from '../Record';

export default {
  title: 'UI/Record/Desktop',
  component: Record,
  decorators: [withJotai]
} as ComponentMeta<typeof Record>;

const Template: ComponentStory<typeof Record> = (args) => (
  <Record {...args} />
);

export const Income = Template.bind({});
Income.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
Income.args = {
  _id: '456-789',
  shortName: 'Uber home to gym.',
  description: 'Paying Uber to go to smartfit on Solesta',
  category: 'Transport',
  subCategory: 'Uber/Didi',
  tag: ['Important'],
  indebtedPeople: [],
  budgets: ['Transport'],
  formattedTime: '17:16pm',
  fullDate: 'May 14',
  amount: '$109.95',
  isPaid: false,
};

export const IncomeWithLongDescription = Template.bind({});
IncomeWithLongDescription.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
IncomeWithLongDescription.args = {
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

export const IncomeWithLongShortName = Template.bind({});
IncomeWithLongShortName.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
IncomeWithLongShortName.args = {
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

export const IncomeWithoutTagsAndBudgets = Template.bind({});
IncomeWithoutTagsAndBudgets.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
IncomeWithoutTagsAndBudgets.args = {
  _id: '456-789',
  shortName: "2 Mcdonalds ",
  description: "Mine and Eric's",
  category: 'Food',
  subCategory: 'Groceries',
  tag: [],
  indebtedPeople: [],
  budgets: [],
  formattedTime: '08:45pm',
  fullDate: 'March 26',
  amount: '$156.00',
  isPaid: false,
};

export const IncomeWithManyBudgets = Template.bind({});
IncomeWithManyBudgets.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
IncomeWithManyBudgets.args = {
  _id: '456-789',
  shortName: "Imagine Dragons concert ",
  description: "CDMX Concert",
  category: 'Leisure',
  subCategory: 'Outdoors',
  tag: [],
  indebtedPeople: [],
  budgets: ['Leisure', 'Debt', 'AMEX', 'Transport'],
  formattedTime: '21:11pm',
  fullDate: 'May 10',
  amount: '$2,256.00',
  isPaid: false,
};

export const IncomeWithManyBudgetsAndLongNameBudget = Template.bind({});
IncomeWithManyBudgetsAndLongNameBudget.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
IncomeWithManyBudgetsAndLongNameBudget.args = {
  _id: '456-789',
  shortName: "Imagine Dragons concert ",
  description: "CDMX Concert",
  category: 'Leisure',
  subCategory: 'Outdoors',
  tag: [],
  indebtedPeople: [],
  budgets: ['A very long name', 'Debt', 'AMEX', 'Transport', 'Other Budget', 'New Budget'],
  formattedTime: '21:11pm',
  fullDate: 'May 10',
  amount: '$2,256.00',
  isPaid: false,
};

export const IncomeWithManyBudgetsAndTags = Template.bind({});
IncomeWithManyBudgetsAndTags.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
IncomeWithManyBudgetsAndTags.args = {
  _id: '456-789',
  shortName: "Imagine Dragons concert ",
  description: "CDMX Concert",
  category: 'Leisure',
  subCategory: 'Outdoors',
  tag: ['Pending', 'Important', 'Beto', 'Other tag'],
  indebtedPeople: [],
  budgets: ['A very long name', 'Debt', 'AMEX', 'Transport', 'Other Budget', 'New Budget'],
  formattedTime: '21:11pm',
  fullDate: 'May 10',
  amount: '$2,256.00',
  isPaid: false,
};

export const IncomeWithNoBudgetsAndManyTags = Template.bind({});
IncomeWithNoBudgetsAndManyTags.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
IncomeWithNoBudgetsAndManyTags.args = {
  _id: '456-789',
  shortName: "Imagine Dragons concert ",
  description: "CDMX Concert",
  category: 'Leisure',
  subCategory: 'Outdoors',
  tag: ['Pending', 'Important', 'Beto', 'Other tag'],
  indebtedPeople: [],
  budgets: [],
  formattedTime: '21:11pm',
  fullDate: 'May 10',
  amount: '$2,256.00',
  isPaid: false,
};

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
