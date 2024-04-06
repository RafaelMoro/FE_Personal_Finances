import { formatCurrencyToString, formatValueToCurrency } from '../../../utils';

interface UseCurrencyFieldProps {
  amount: string;
  setFieldValue: (name: string, value: string) => void;
  updateAmount: (amount: string) => void;
}

const useCurrencyField = ({ amount, setFieldValue, updateAmount }: UseCurrencyFieldProps) => {
  const CURRENCY_FIELD_NAME = 'amount';
  const validateCurrencyFieldErrors = (value: string) => {
    let error;
    const hasMoreThanThreeDecimals = /\.\d{3}$/;
    if (value.match(hasMoreThanThreeDecimals)) {
      error = 'You cannot use more than 2 decimals.';
      return error;
    }
    return error;
  };

  const validateCurrencyField = (value: string) => {
    const hasNumericPeriodComma = /[0-9.,]+/;
    const isPeriod = /\./;
    const valueHasForbiddenCharacters = !value.match(hasNumericPeriodComma);
    const valueBeginsWithPeriod = amount === '' && value.match(isPeriod);
    const emptyValue = !value && amount;

    return {
      valueHasForbiddenCharacters,
      valueBeginsWithPeriod,
      emptyValue,
    };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const {
      valueHasForbiddenCharacters,
      valueBeginsWithPeriod,
      emptyValue,
    } = validateCurrencyField(newValue);
    const hasDeletedCharacter = amount.length > newValue.length;
    const hasDeletedNumber = /,\d{2}$/;
    const valueEndsWithPeriod = /[0-9]+[.]$/;
    const hasComma = /,/;
    if (emptyValue) {
      updateAmount('0');
      setFieldValue(CURRENCY_FIELD_NAME, '');
      return;
    }
    if (valueHasForbiddenCharacters) return;
    if (valueBeginsWithPeriod) return;

    if (hasDeletedCharacter && newValue.match(hasDeletedNumber)) {
      const newAmountNotFormatted = formatCurrencyToString(newValue);
      updateAmount(newAmountNotFormatted);
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
      updateAmount(newValue);
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
      updateAmount(newAmountNotFormatted);
      const newAmount = formatValueToCurrency({ amount: newAmountNotFormatted, hasNoDecimals: true, hasNoCurrencySign: true });
      setFieldValue(CURRENCY_FIELD_NAME, newAmount);
      return;
    }
    // Guardar el nuevo amount como string
    // Transformo el monto a currency
    updateAmount(newValue);
    setFieldValue(CURRENCY_FIELD_NAME, newValue);
  };

  return {
    validateCurrencyFieldErrors,
    handleChange,
  };
};

export { useCurrencyField };
