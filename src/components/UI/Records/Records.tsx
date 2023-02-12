import { IRecordsProps } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';
import { RecordContainer } from './Records.styled';
import { Paragraph } from '../../../styles';

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
    <RecordContainer>
      <Paragraph>{ shortName }</Paragraph>
      <Paragraph>{ fullDate }</Paragraph>
      <Paragraph>{ hourMinute }</Paragraph>
      <Paragraph>{ description }</Paragraph>
      <Paragraph>{ formattedPrice }</Paragraph>
      { budgets.length > 0 && budgets.map((budget) => (
        <Paragraph key={budget.id}>{ budget?.name }</Paragraph>
      ))}
    </RecordContainer>
  );
};

export { Records };
