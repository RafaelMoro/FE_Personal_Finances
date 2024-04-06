import { Field } from 'formik';
import { useRef } from 'react';
import { InputForm } from '../../styles';
import { TypeOfRecord } from '../../globalInterface';
import { CurrencyAdornment } from '../UI/Records/features/TransactionFormFields/CurrencyAdornment';
import { formatCurrencyToString, formatValueToCurrency } from '../../utils';

interface CurrencyFieldProps {
  amount: string;
  typeOfRecord: TypeOfRecord;
  setFieldValue: (name: string, value: string) => void;
  updateAmount: (amount: string) => void;
}
const CURRENCY_FIELD_NAME = 'amount';

const CurrencyField = ({
  setFieldValue, updateAmount, amount, typeOfRecord,
}: CurrencyFieldProps) => {
  const amountNotFormatted = useRef('0');
  const updateAmountNotFormatted = (newAmount: string) => {
    amountNotFormatted.current = newAmount;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const hasDeletedCharacter = amount.length > newValue.length;
    const hasDeletedNumber = /,\d{2}$/;
    const hasNumericPeriodComma = /[0-9.,]+/;
    const hasMoreThanThreeDecimals = /\.\d{3}$/;
    const valueEndsWithPeriod = /[0-9]+[.]$/;
    const isPeriod = /\./;
    const hasComma = /,/;
    // If the value is not a number, do not update the field
    if (!newValue.match(hasNumericPeriodComma)) return;
    // If the new character is a period and there is no number, do not update the field
    if (amount === '' && newValue.match(isPeriod)) return;
    // If the amount has more than two decimals, do not update the field
    if (newValue.match(hasMoreThanThreeDecimals)) return;

    if (hasDeletedCharacter && newValue.match(hasDeletedNumber)) {
      const newAmountNotFormatted = formatCurrencyToString(newValue);
      updateAmountNotFormatted(newAmountNotFormatted);
      const newAmount = formatValueToCurrency({ amount: newAmountNotFormatted, hasNoDecimals: true, hasNoCurrencySign: true });
      setFieldValue(CURRENCY_FIELD_NAME, newAmount);
      return;
    }

    // If the new value is a thousand, formate the number
    if (newValue.length === 4 && !newValue.match(hasComma)) {
      if (newValue.match(valueEndsWithPeriod)) {
        setFieldValue(CURRENCY_FIELD_NAME, newValue);
        return;
      }
      updateAmountNotFormatted(newValue);
      const newAmount = formatValueToCurrency({ amount: newValue, hasNoDecimals: true, hasNoCurrencySign: true });
      setFieldValue(CURRENCY_FIELD_NAME, newAmount);
      return;
    }
    if (newValue.length > 5 && newValue.match(hasComma)) {
      if (newValue.match(valueEndsWithPeriod)) {
        setFieldValue(CURRENCY_FIELD_NAME, newValue);
        return;
      }
      const newAmountNotFormatted = formatCurrencyToString(newValue);
      updateAmountNotFormatted(newAmountNotFormatted);
      const newAmount = formatValueToCurrency({ amount: newAmountNotFormatted, hasNoDecimals: true, hasNoCurrencySign: true });
      setFieldValue(CURRENCY_FIELD_NAME, newAmount);
      return;
    }
    // Guardar el nuevo amount como string
    // Transformo el monto a currency
    updateAmountNotFormatted(newValue);
    setFieldValue(CURRENCY_FIELD_NAME, newValue);
  };

  return (
    <Field
      component={InputForm}
      name="amount"
      type="text"
      variant="standard"
      label="Amount"
      onChange={handleChange}
      InputProps={{
        startAdornment: CurrencyAdornment({ typeOfRecord }),
      }}
    />
  );
};

export { CurrencyField };
