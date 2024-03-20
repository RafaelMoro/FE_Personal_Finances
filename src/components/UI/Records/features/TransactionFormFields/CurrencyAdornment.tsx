import { InputAdornment } from '../../../../../styles';
import { TypeOfRecord } from '../RecordTemplate/interface';

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
