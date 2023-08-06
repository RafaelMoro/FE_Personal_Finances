/* eslint-disable no-console */
import { Formik } from 'formik';

import { useAllExpenses } from '../../../../../hooks/useAllExpenses';
import { ExpensePaid } from '../../interface';
import { MONTHS } from '../../../../../constants';
import { Loader } from '../../../../../animations/Loader';
import { SelectInput } from '../../../SelectInput';
import { SelectExpensesTable } from '../SelectExpensesTable/SelectExpensesTable';
import { Paragraph, SecondaryButton } from '../../../../../styles';
import { SelectExpensesContainer } from '../Features.styled';
import { SelectMonthYearBox } from '../../Records.styled';
import { todayDate } from '../../../../../utils/TodayDate';
import { createYearsArray } from '../../../../../utils/CreateYearsArray';

interface SelectExpensesProps {
  modifySelectedExpenses: (expenses: ExpensePaid[]) => void;
  selectedExpenses: ExpensePaid[];
  closeDrawer: () => void;
}

const SelectExpenses = ({
  modifySelectedExpenses, selectedExpenses = [], closeDrawer,
}: SelectExpensesProps) => {
  const {
    expenses, noExpensesFound, error, loading,
  } = useAllExpenses();
  const { completeMonth, currentYear } = todayDate();
  const YEARS = createYearsArray();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => console.log(values);

  if (loading) {
    return (
      <SelectExpensesContainer>
        <Paragraph>Loading expenses...</Paragraph>
        <Loader />
      </SelectExpensesContainer>
    );
  }

  if (error !== 'No error found') {
    return (
      <SelectExpensesContainer>
        <Paragraph>An error was found, try again later.</Paragraph>
      </SelectExpensesContainer>
    );
  }
  if (noExpensesFound) {
    return (
      <SelectExpensesContainer>
        <Paragraph>No expenses found for this account</Paragraph>
      </SelectExpensesContainer>
    );
  }
  return (
    <>
      <Formik
        initialValues={{ month: completeMonth, year: currentYear }}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize
        validateOnMount
      >
        {({ submitForm }) => (
          <SelectMonthYearBox>
            <SelectInput
              labelId="select-month"
              labelName="Month"
              fieldName="month"
              stringOptions={MONTHS}
              colorOptions={[]}
            />
            <SelectInput
              labelId="select-year"
              labelName="Year"
              fieldName="year"
              stringOptions={YEARS}
              colorOptions={[]}
            />
            <SecondaryButton onSubmit={submitForm}>Search expenses</SecondaryButton>
          </SelectMonthYearBox>
        )}
      </Formik>
      <SelectExpensesTable
        expenses={expenses}
        modifySelectedExpenses={modifySelectedExpenses}
        selectedExpenses={selectedExpenses}
        closeDrawer={closeDrawer}
      />
    </>
  );
};

export { SelectExpenses };
