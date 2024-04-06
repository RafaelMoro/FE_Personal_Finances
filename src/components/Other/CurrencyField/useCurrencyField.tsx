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
    const hasPeriodRegex = /\./;
    const deletedCharacterRegex = amount.length > value.length;
    const deletedNumberRegex = /,\d{2}$/;
    const EndsWithPeriodRegex = /[0-9]+[.]$/;
    const hasCommaRegex = /,/;

    const valueHasForbiddenCharacters = !value.match(hasNumericPeriodComma);
    const valueBeginsWithPeriod = amount === '' && value.match(hasPeriodRegex);
    const emptyValue = !value && amount;
    const hasDeleted = deletedCharacterRegex && value.match(deletedNumberRegex);
    const isValueThousandWithNoComma = value.length === 4 && !value.match(hasCommaRegex);
    const isValueThousandWithComma = value.length > 5 && value.match(hasCommaRegex);
    const valueEndsWithPeriod = value.match(EndsWithPeriodRegex);

    return {
      valueHasForbiddenCharacters,
      valueBeginsWithPeriod,
      emptyValue,
      hasDeletedCharacter: deletedCharacterRegex,
      hasDeletedNumber: deletedNumberRegex,
      valueEndsWithPeriod,
      hasComma: hasCommaRegex,
      hasDeleted,
      isValueThousandWithNoComma,
      isValueThousandWithComma,
    };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const {
      valueHasForbiddenCharacters,
      valueBeginsWithPeriod,
      emptyValue,
      valueEndsWithPeriod,
      hasDeleted,
      isValueThousandWithNoComma,
      isValueThousandWithComma,
    } = validateCurrencyField(newValue);
    if (emptyValue) {
      updateAmount('0');
      setFieldValue(CURRENCY_FIELD_NAME, '');
      return;
    }
    if (valueHasForbiddenCharacters) return;
    if (valueBeginsWithPeriod) return;

    if (hasDeleted) {
      const newAmountNotFormatted = formatCurrencyToString(newValue);
      updateAmount(newAmountNotFormatted);
      const newAmount = formatValueToCurrency({ amount: newAmountNotFormatted, hasNoDecimals: true, hasNoCurrencySign: true });
      setFieldValue(CURRENCY_FIELD_NAME, newAmount);
      return;
    }

    if (isValueThousandWithNoComma) {
      if (valueEndsWithPeriod) {
        setFieldValue(CURRENCY_FIELD_NAME, newValue);
        return;
      }
      updateAmount(newValue);
      const newAmount = formatValueToCurrency({ amount: newValue, hasNoDecimals: true, hasNoCurrencySign: true });
      setFieldValue(CURRENCY_FIELD_NAME, newAmount);
      return;
    }

    if (isValueThousandWithComma) {
      if (valueEndsWithPeriod) {
        setFieldValue(CURRENCY_FIELD_NAME, newValue);
        return;
      }
      const newAmountNotFormatted = formatCurrencyToString(newValue);
      updateAmount(newAmountNotFormatted);
      const newAmount = formatValueToCurrency({ amount: newAmountNotFormatted, hasNoDecimals: true, hasNoCurrencySign: true });
      setFieldValue(CURRENCY_FIELD_NAME, newAmount);
      return;
    }
    updateAmount(newValue);
    setFieldValue(CURRENCY_FIELD_NAME, newValue);
  };

  return {
    validateCurrencyFieldErrors,
    handleChange,
  };
};

export { useCurrencyField };
