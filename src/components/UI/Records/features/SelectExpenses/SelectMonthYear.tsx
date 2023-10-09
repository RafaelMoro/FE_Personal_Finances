import { Formik } from 'formik';
import { SelectMonthYearValues } from '../../interface';
import { SelectMonthYearBox } from '../../Records.styled';
import { SelectInput } from '../../../SelectInput';
import { MONTHS } from '../../../../../constants';
import { SecondaryButton } from '../../../../../styles';
import { CompleteMonthsType } from '../../../../../globalInterface';

interface SelectMonthYearProps {
  updateMonthYear: (values: SelectMonthYearValues) => void;
  completeMonth: CompleteMonthsType;
  currentYear: string;
  yearsArray: string[];
}

const SelectMonthYear = ({
  updateMonthYear, completeMonth, currentYear, yearsArray,
}: SelectMonthYearProps) => (
  <Formik
    initialValues={{ month: completeMonth, year: currentYear }}
    onSubmit={(values) => updateMonthYear(values)}
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
          stringOptions={yearsArray}
          colorOptions={[]}
        />
        <SecondaryButton onClick={submitForm}>Search expenses</SecondaryButton>
      </SelectMonthYearBox>
    )}
  </Formik>
);

export { SelectMonthYear };
