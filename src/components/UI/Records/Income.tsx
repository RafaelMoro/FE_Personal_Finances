import { useAtom } from 'jotai';
import { windowSizeAtom } from '../../../atoms';
import { RecordIncome, RecordIncomeMobile } from './Records.styled';
import { IncomeProps } from './interface';
// import { IncomeRecord } from './features/IncomeRecord';

const Expense = ({ amount, expensesPaid }: IncomeProps) => {
  const [windowSize] = useAtom(windowSizeAtom);

  if (windowSize !== 'Mobile') {
    return (
      <>
        <RecordIncomeMobile>
          -
          {' '}
          a
          { amount }
        </RecordIncomeMobile>
        { (expensesPaid.length > 0) && (
          {/* <IncomeRecord payedLinkedRecords={expensesPaid} shortView /> */}
        )}
      </>
    );
  }

  return (
    <>
      <RecordIncome>
        -
        {' '}
        { amount }
      </RecordIncome>
      { (expensesPaid.length > 0) && (
        {/* <IncomeRecord payedLinkedRecords={expensesPaid} shortView /> */}
      )}
    </>
  );
};

export { Expense };
