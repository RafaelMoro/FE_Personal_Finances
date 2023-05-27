import { useAtom } from 'jotai';

import { Record } from './Record';
import { windowSizeAtom } from '../../../atoms';
import { RecordExpense, RecordExpenseMobile } from './Records.styled';
import { ExpenseUI } from './interface';

const Expense = ({
  _id, shortName, description, amount, fullDate, formattedTime,
  category, subCategory, tag, indebtedPeople, budgets, shortView,
}: ExpenseUI) => {
  const [windowSize] = useAtom(windowSizeAtom);

  if (windowSize !== 'Mobile') {
    return (
      <Record
        _id={_id}
        shortName={shortName}
        description={description}
        fullDate={fullDate}
        formattedTime={formattedTime}
        category={category}
        subCategory={subCategory}
        tag={tag}
        indebtedPeople={indebtedPeople}
        budgets={budgets}
        shortView={shortView}
      >
        <RecordExpenseMobile>
          -
          {' '}
          { amount }
        </RecordExpenseMobile>
      </Record>
    );
  }

  return (
    <Record
      _id={_id}
      shortName={shortName}
      description={description}
      fullDate={fullDate}
      formattedTime={formattedTime}
      category={category}
      subCategory={subCategory}
      tag={tag}
      indebtedPeople={indebtedPeople}
      budgets={budgets}
      shortView={shortView}
    >
      <RecordExpense>
        -
        {' '}
        { amount }
      </RecordExpense>
    </Record>
  );
};

export { Expense };
