import { IRecordsProps } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';

const Records = ({
  shortName, description, price, budgets,
}: IRecordsProps) => {
  const formattedPrice = formatNumberToCurrency(price);
  return (
    <div>
      <p>{ shortName }</p>
      <p>{ description }</p>
      <p>{ formattedPrice }</p>
      { budgets.length > 0 && budgets.map((budget) => (
        <p key={budget.id}>{ budget?.name }</p>
      ))}
    </div>
  );
};

export { Records };
