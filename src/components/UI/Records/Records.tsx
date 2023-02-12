import { Stack } from '@mui/material';

import { IRecordsProps } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';
import {
  RecordContainer, RecordDescription, RecordDateTime, RecordIncome, RecordExpense,
} from './Records.styled';
import { Paragraph, StyledChip, ParagraphTitle } from '../../../styles';

const MONTHS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const Records = ({
  shortName, description, price, budgets, date, recordType,
}: IRecordsProps) => {
  const formattedPrice = formatNumberToCurrency(price);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const fullDate = `${MONTHS[month]} - ${day}`;
  const hourMinute = `${hours}:${minutes}`;

  return (
    <RecordContainer>
      <ParagraphTitle>{ shortName }</ParagraphTitle>
      <RecordDateTime>{ fullDate }</RecordDateTime>
      <RecordDateTime>{ hourMinute }</RecordDateTime>
      <RecordDescription>{ description }</RecordDescription>
      { recordType === 'Expense' ? (
        <RecordExpense>
          -
          {' '}
          { formattedPrice }
        </RecordExpense>
      ) : (
        <RecordIncome>
          +
          {' '}
          { formattedPrice }
        </RecordIncome>
      ) }
      <Stack direction="row" spacing={1}>
        { budgets.length > 0 && budgets.map((budget) => (
          <StyledChip key={budget.id} label={budget.name} variant="outlined" color="primary" />
        ))}
      </Stack>
    </RecordContainer>
  );
};

export { Records };
