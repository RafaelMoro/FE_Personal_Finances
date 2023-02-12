import { Stack } from '@mui/material';

import { TRecordProps } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';
import { formatDateToString } from '../../../utils/FormatDateToString';
import { IncomeRecord } from './IncomeRecord';
import {
  RecordContainer, RecordDescription, RecordDateTime, RecordIncome, RecordExpense,
} from './Records.styled';
import { StyledChip, ParagraphTitle } from '../../../styles';

const Record = ({
  shortName, description, price, budgets = [], date,
  recordType, linkedPayedRecords, shortView = true,
}: TRecordProps) => {
  const formattedPrice = formatNumberToCurrency(price);
  const { fullDate, formattedTime } = formatDateToString(date);
  const isExpense = recordType === 'Expense';

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
      { !isExpense && (
      <IncomeRecord payedLinkedRecords={linkedPayedRecords || []} shortView={shortView} />
      )}
    </RecordContainer>
  );
};

export { Record };
