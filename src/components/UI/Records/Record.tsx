import { Stack } from '@mui/material';
import { useAtom } from 'jotai';

import { windowSizeAtom } from '../../../atoms';
import { TRecordProps } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';
import { formatDateToString } from '../../../utils/FormatDateToString';
import { IncomeRecord } from './features/IncomeRecord';
import {
  RecordContainer, RecordDescription, RecordDateTime, RecordIncome, RecordExpense,
  RecordContainerMobile,
} from './Records.styled';
import { Chip, ParagraphTitle } from '../../../styles';

const Record = ({
  shortName, description, price, budgets = [], date,
  recordType, linkedPayedRecords = [], shortView = true,
}: TRecordProps) => {
  const [windowSize] = useAtom(windowSizeAtom);
  const formattedPrice = formatNumberToCurrency(price);
  const { fullDate, formattedTime } = formatDateToString(date);
  const isExpense = recordType === 'Expense';

  if (windowSize !== 'Mobile') {
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
          { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" color="secondary" />) }
          { budgets.length > 0 && budgets.map((budget) => (
            <Chip key={budget.id} label={budget.name} variant="outlined" color="primary" />
          ))}
        </Stack>
        { (!isExpense && linkedPayedRecords.length > 0) && (
        <IncomeRecord payedLinkedRecords={linkedPayedRecords} shortView={shortView} />
        )}
      </RecordContainer>
    );
  }

  return (
    <RecordContainerMobile>
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
    </RecordContainerMobile>
  );
};

export { Record };
