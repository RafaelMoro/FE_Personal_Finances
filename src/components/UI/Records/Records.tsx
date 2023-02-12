import { IRecordsProps } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';

const Records = ({
  shortName, description, price, budgets, date,
}: IRecordsProps) => {
  const formattedPrice = formatNumberToCurrency(price);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const fullDate = `${month}/${day}/${year}`;
  const hourMinute = `${hours}:${minutes}`;

  return (
    <div>
      <p>{ shortName }</p>
      <p>{ fullDate }</p>
      <p>{ description }</p>
      <p>{ formattedPrice }</p>
      { budgets.length > 0 && budgets.map((budget) => (
        <p key={budget.id}>{ budget?.name }</p>
      ))}
    </div>
  );
};

export { Records };
