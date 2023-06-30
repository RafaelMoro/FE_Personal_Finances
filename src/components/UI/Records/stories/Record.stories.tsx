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

export const Expense = Template.bind({});
Expense.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
Expense.args = {
  _id: '456-789',
  shortName: 'Uber home to gym.',
  description: 'Paying Uber to go to smartfit on Solesta',
  category: {
    _id: '123-456-789',
    categoryName: 'Transport'
  },
  subCategory: 'Uber/Didi',
  tag: ['Important'],
  indebtedPeople: [],
  budgets: ['Transport'],
  formattedTime: '17:16pm',
  fullDate: 'May 14',
  amount: '$109.95',
  isPaid: false,
};

export const ExpenseWithLongDescription = Template.bind({});
ExpenseWithLongDescription.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
ExpenseWithLongDescription.args = {
  _id: '456-789',
  shortName: 'Groceries for the week.',
  description: 'Eggs $42.5, Meat $182.8, Bananas $17.2, Avocado $36.34, Six Beers $116.31, Coca-cola $45, Mineral water $36, Chips $63, Erics juice $17, Cheese for two weeeks $230, fried chicken for the family $184.29',
  category: {
    _id: '123-456-789',
    categoryName: 'Food'
  },
  subCategory: 'Groceries',
  tag: ['Important'],
  indebtedPeople: [],
  budgets: ['Food'],
  formattedTime: '15:31pm',
  fullDate: 'May 19',
  amount: '$970.44',
  isPaid: false,
};

export const ExpenseWithLongShortName = Template.bind({});
ExpenseWithLongShortName.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
ExpenseWithLongShortName.args = {
  _id: '456-789',
  shortName: "McDonald's didi food 2 combos of $99 each. Rob owes me at Jan 31. Putting more words to see how does the short name behaves in this component. ",
  description: 'Paying Uber to go to a bar.',
  category: {
    _id: '123-456-789',
    categoryName: 'Food'
  },
  subCategory: 'Groceries',
  tag: ['Important'],
  indebtedPeople: [],
  budgets: ['Food'],
  formattedTime: '05:21pm',
  fullDate: 'Feb 10',
  amount: '$67.43',
  isPaid: false,
};

export const ExpenseWithoutTagsAndBudgets = Template.bind({});
ExpenseWithoutTagsAndBudgets.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
ExpenseWithoutTagsAndBudgets.args = {
  _id: '456-789',
  shortName: "2 Mcdonalds ",
  description: "Mine and Eric's",
  category: {
    _id: '123-456-789',
    categoryName: 'Food'
  },
  subCategory: 'Groceries',
  tag: [],
  indebtedPeople: [],
  budgets: [],
  formattedTime: '08:45pm',
  fullDate: 'March 26',
  amount: '$156.00',
  isPaid: false,
};

export const ExpenseWithManyBudgets = Template.bind({});
ExpenseWithManyBudgets.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
ExpenseWithManyBudgets.args = {
  _id: '456-789',
  shortName: "Imagine Dragons concert ",
  description: "CDMX Concert",
  category: {
    _id: '123-456-789',
    categoryName: 'Leisure'
  },
  subCategory: 'Outdoors',
  tag: [],
  indebtedPeople: [],
  budgets: ['Leisure', 'Debt', 'AMEX', 'Transport'],
  formattedTime: '21:11pm',
  fullDate: 'May 10',
  amount: '$2,256.00',
  isPaid: false,
};

export const ExpenseWithManyBudgetsAndLongNameBudget = Template.bind({});
ExpenseWithManyBudgetsAndLongNameBudget.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
ExpenseWithManyBudgetsAndLongNameBudget.args = {
  _id: '456-789',
  shortName: "Imagine Dragons concert ",
  description: "CDMX Concert",
  category: {
    _id: '123-456-789',
    categoryName: 'Leisure'
  },
  subCategory: 'Outdoors',
  tag: [],
  indebtedPeople: [],
  budgets: ['A very long name', 'Debt', 'AMEX', 'Transport', 'Other Budget', 'New Budget'],
  formattedTime: '21:11pm',
  fullDate: 'May 10',
  amount: '$2,256.00',
  isPaid: false,
};

export const ExpenseWithManyBudgetsAndTags = Template.bind({});
ExpenseWithManyBudgetsAndTags.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
ExpenseWithManyBudgetsAndTags.args = {
  _id: '456-789',
  shortName: "Imagine Dragons concert ",
  description: "CDMX Concert",
  category: {
    _id: '123-456-789',
    categoryName: 'Leisure'
  },
  subCategory: 'Outdoors',
  tag: ['Pending', 'Important', 'Beto', 'Other tag'],
  indebtedPeople: [],
  budgets: ['A very long name', 'Debt', 'AMEX', 'Transport', 'Other Budget', 'New Budget'],
  formattedTime: '21:11pm',
  fullDate: 'May 10',
  amount: '$2,256.00',
  isPaid: false,
};

export const ExpenseWithNoBudgetsAndManyTags = Template.bind({});
ExpenseWithNoBudgetsAndManyTags.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
ExpenseWithNoBudgetsAndManyTags.args = {
  _id: '456-789',
  shortName: "Imagine Dragons concert ",
  description: "CDMX Concert",
  category: {
    _id: '123-456-789',
    categoryName: 'Leisure'
  },
  subCategory: 'Outdoors',
  tag: ['Pending', 'Important', 'Beto', 'Other tag'],
  indebtedPeople: [],
  budgets: [],
  formattedTime: '21:11pm',
  fullDate: 'May 10',
  amount: '$2,256.00',
  isPaid: false,
};

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
  shortName: "Payment to credit card",
  description: "From May 12th to May 19th",
  category: {
    _id: '123-456-789',
    categoryName: 'Payment'
  },
  subCategory: 'Credit Card',
  tag: [],
  indebtedPeople: [],
  budgets: [],
  formattedTime: '21:18pm',
  fullDate: 'June 10',
  amount: '$2,256.00',
  expensesPaid: [],
};

export const IncomeWithExpensesPaid = Template.bind({});
IncomeWithExpensesPaid.parameters = {
  jotai: {
    atoms: {
      windowSize: windowSizeAtom
    },
    values: {
      windowSize: 'Desktop'
    }
  }
}
IncomeWithExpensesPaid.args = {
  _id: '456-789',
  shortName: "Payment to credit card",
  description: "From May 12th to May 19th",
  category: {
    _id: '123-456-789',
    categoryName: 'Payment'
  },
  subCategory: 'Credit Card',
  tag: [],
  indebtedPeople: [],
  budgets: [],
  formattedTime: '21:18pm',
  fullDate: 'June 10',
  amount: '$2,256.00',
  expensesPaid: [
    {
      _id: '64600b8f2bb57b9d17843d87',
      shortName: 'Chilaquiles',
      amount: '$96.03',
      fullDate: 'May 20',
      formattedTime: '1:50pm',
    },
    {
      _id: '64600b8f2bb57b9d17843d87',
      shortName: 'Chilaquiles',
      amount: '$96.03',
      fullDate: 'May 20',
      formattedTime: '1:50pm',
    },
  ],
};
