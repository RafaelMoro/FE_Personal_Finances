import { InputAdornment } from '../../../../../styles';
import { TypeOfRecord } from '../../../../../globalInterface';

const CurrencyAdornment = ({ typeOfRecord }: { typeOfRecord: TypeOfRecord }) => {
  const isExpense = typeOfRecord === 'expense';
  const isIncome = typeOfRecord === 'income';
  return (
    <InputAdornment position="start">
      {(isExpense) && ('- ')}
      {(isIncome) && ('+ ')}
      $
    </InputAdornment>
  );
};

export { CurrencyAdornment };
