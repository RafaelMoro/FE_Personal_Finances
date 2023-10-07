import { withJotai } from 'storybook-addon-jotai';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { windowSizeAtom } from '../../../../atoms';
import { Record } from '../Record';
import {
  expenseSample,expenseSampleWithLongShortName, ExpenseSampleWithoutTagsAndBudgets,
  ExpenseSampleWithManyBudgets, ExpenseSampleWithManyBudgetsAndLongNameBudget,
  ExpenseSampleWithManyBudgetsAndTags, ExpenseSampleWithNoBudgetsAndManyTags,
  IncomeSample, IncomeSampleWithExpensesPaid, expenseSampleWithLongDescription,
  backgroundColorDefault,
} from './Record.mocks';

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
  record: expenseSample,
  backgroundColor: backgroundColorDefault,
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
  record: expenseSampleWithLongDescription,
  backgroundColor: backgroundColorDefault,
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
  record: expenseSampleWithLongShortName,
  backgroundColor: backgroundColorDefault,
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
  record: ExpenseSampleWithoutTagsAndBudgets,
  backgroundColor: backgroundColorDefault,
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
  record: ExpenseSampleWithManyBudgets,
  backgroundColor: backgroundColorDefault,
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
  record: ExpenseSampleWithManyBudgetsAndLongNameBudget,
  backgroundColor: backgroundColorDefault,
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
  record: ExpenseSampleWithManyBudgetsAndTags,
  backgroundColor: backgroundColorDefault,
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
  record: ExpenseSampleWithNoBudgetsAndManyTags,
  backgroundColor: backgroundColorDefault,
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
  record: IncomeSample,
  backgroundColor: backgroundColorDefault,
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
  record: IncomeSampleWithExpensesPaid,
  backgroundColor: backgroundColorDefault,
};
