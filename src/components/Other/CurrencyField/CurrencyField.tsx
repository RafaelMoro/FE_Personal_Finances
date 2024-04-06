import { Field } from 'formik';
import { InputForm } from '../../../styles';
import { TypeOfRecord } from '../../../globalInterface';
import { CurrencyAdornment } from '../../UI/Records/features/TransactionFormFields/CurrencyAdornment';
import { useCurrencyField } from './useCurrencyField';

interface CurrencyFieldProps {
  amount: string;
  typeOfRecord: TypeOfRecord;
  setFieldValue: (name: string, value: string) => void;
  updateAmount: (amount: string) => void;
}

const CurrencyField = ({
  setFieldValue, updateAmount, amount, typeOfRecord,
}: CurrencyFieldProps) => {
  const { validateCurrencyFieldErrors, handleChange } = useCurrencyField({ setFieldValue, amount, updateAmount });

  return (
    <Field
      component={InputForm}
      name="amount"
      type="text"
      variant="standard"
      label="Amount"
      onChange={handleChange}
      validate={validateCurrencyFieldErrors}
      InputProps={{
        startAdornment: CurrencyAdornment({ typeOfRecord }),
      }}
    />
  );
};

export { CurrencyField };
