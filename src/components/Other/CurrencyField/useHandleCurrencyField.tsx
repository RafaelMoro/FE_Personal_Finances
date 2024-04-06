import { formatCurrencyToString, formatValueToCurrency } from '../../../utils';

interface UseCurrencyFieldProps {
  amount: string;
  fieldName?: string;
  setFieldValue: (name: string, value: string) => void;
  updateAmount: (amount: string) => void;
}
/*
* Custom hook that has all the logic of the handleChange function of the CurrencyField component.
*/
const useHandleCurrencyField = ({
  amount, setFieldValue, updateAmount, fieldName,
}: UseCurrencyFieldProps) => {
  const CURRENCY_FIELD_NAME = 'amount';
  const currentFieldName = fieldName ?? CURRENCY_FIELD_NAME;

  const validateCurrencyField = (value: string) => {
    const hasNumericPeriodCommaRegex = /[0-9.,]+/;
    const startsWithPeriodRegex = /^\./;
    const deletedNumberRegex = /,\d{2}$/;
    const EndsWithPeriodRegex = /[0-9]+[.]$/;
    const hasCommaRegex = /,/;

    const valueHasForbiddenCharacters = !value.match(hasNumericPeriodCommaRegex);
    const valueBeginsWithPeriod = amount === '' && value.match(startsWithPeriodRegex);
    const emptyValue = !value && amount;
    const hasDeleted = value.match(deletedNumberRegex);
    const isValueThousandWithNoComma = value.length === 4 && !value.match(hasCommaRegex);
    const isValueThousandWithComma = value.length > 5 && value.match(hasCommaRegex);
    const valueEndsWithPeriod = value.match(EndsWithPeriodRegex);

    return {
      valueHasForbiddenCharacters,
      valueBeginsWithPeriod,
      emptyValue,
      deletedNumberRegex,
      valueEndsWithPeriod,
      hasCommaRegex,
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
      setFieldValue(currentFieldName, '');
      return;
    }
    if (valueHasForbiddenCharacters) return;
    if (valueBeginsWithPeriod) return;

    if (hasDeleted) {
      const newAmountNotFormatted = formatCurrencyToString(newValue);
      updateAmount(newAmountNotFormatted);
      const newAmount = formatValueToCurrency({ amount: newAmountNotFormatted, hasNoDecimals: true, hasNoCurrencySign: true });
      setFieldValue(currentFieldName, newAmount);
      return;
    }

    if (isValueThousandWithNoComma) {
      if (valueEndsWithPeriod) {
        setFieldValue(currentFieldName, newValue);
        return;
      }
      updateAmount(newValue);
      const newAmount = formatValueToCurrency({ amount: newValue, hasNoDecimals: true, hasNoCurrencySign: true });
      setFieldValue(currentFieldName, newAmount);
      return;
    }

    if (isValueThousandWithComma) {
      if (valueEndsWithPeriod) {
        setFieldValue(currentFieldName, newValue);
        return;
      }
      const newAmountNotFormatted = formatCurrencyToString(newValue);
      updateAmount(newAmountNotFormatted);
      const newAmount = formatValueToCurrency({ amount: newAmountNotFormatted, hasNoDecimals: true, hasNoCurrencySign: true });
      setFieldValue(currentFieldName, newAmount);
      return;
    }
    updateAmount(newValue);
    setFieldValue(currentFieldName, newValue);
  };

  return {
    handleChange,
  };
};

export { useHandleCurrencyField };
