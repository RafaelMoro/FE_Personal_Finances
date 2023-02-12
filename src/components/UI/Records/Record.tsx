import { Stack } from '@mui/material';

import { TRecordProps } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';
import {
  RecordContainer, RecordDescription, RecordDateTime, RecordIncome, RecordExpense,
} from './Records.styled';
import { StyledChip, ParagraphTitle } from '../../../styles';

const MONTHS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const Record = ({
  shortName, description, price, budgets = [], date, recordType, children,
}: TRecordProps) => {
  const formattedPrice = formatNumberToCurrency(price);
  const isExpense = recordType === 'Expense';

  const day = date.getDate();
  const month = date.getMonth();
  const hour = date.getHours();
  const hourString = String(hour).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const fullDate = `${MONTHS[month]} ${day}`;
  const twelveHourPeriod = hour >= 0 && hour <= 11 ? 'am' : 'pm';
  const formattedTime = `${hourString}:${minutes}${twelveHourPeriod}`;

  return (
    <RecordContainer>
      <ParagraphTitle>{ shortName }</ParagraphTitle>
      <RecordDateTime>{ fullDate }</RecordDateTime>
      <RecordDateTime>{ formattedTime }</RecordDateTime>
      <RecordDescription>{ description }</RecordDescription>
      { isExpense ? (
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
        { budgets.length === 0 && (<StyledChip label="No Budget" variant="outlined" color="secondary" />) }
        { budgets.length > 0 && budgets.map((budget) => (
          <StyledChip key={budget.id} label={budget.name} variant="outlined" color="primary" />
        ))}
      </Stack>
      { children }
    </RecordContainer>
  );
};

export { Record };
