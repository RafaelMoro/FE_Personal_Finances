import { Field } from 'formik';
import { InputForm } from '../../../styles';
import { TypeOfRecord } from '../../../globalInterface';
import { CurrencyAdornment } from '../../UI/Records/features/TransactionFormFields/CurrencyAdornment';
import { useHandleCurrencyField } from './useHandleCurrencyField';

interface CurrencyFieldProps {
  amount: string;
  typeOfRecord?: TypeOfRecord;
  fieldName?: string;
  labelName?: string;
  setFieldValue: (name: string, value: string) => void;
  updateAmount: (amount: string) => void;
}

const CurrencyField = ({
  setFieldValue, updateAmount, amount, typeOfRecord, fieldName, labelName,
}: CurrencyFieldProps) => {
  const { handleChange } = useHandleCurrencyField({
    setFieldValue, amount, updateAmount, fieldName,
  });

  return (
    <Field
      component={InputForm}
      name={fieldName ?? 'amount'}
      type="text"
      variant="standard"
      label={labelName ?? 'Amount'}
      onChange={handleChange}
      InputProps={{
        startAdornment: CurrencyAdornment({ typeOfRecord }),
      }}
    />
  );
};

export { CurrencyField };
