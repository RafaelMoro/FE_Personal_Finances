import { useAtom } from 'jotai';

import { windowSizeAtom } from '../../../atoms';
import { TRecordProps } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';
import { formatDateToString } from '../../../utils/FormatDateToString';
import { IncomeRecord } from './features/IncomeRecord';
import {
  RecordContainer, RecordDescription, RecordDateTime, RecordIncome, RecordExpense,
  RecordContainerMobile, RecordTitleMobile, RecordDateTimeContainer, RecordIncomeMobile,
  RecordExpenseMobile, BudgetChipContainer,
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
        <BudgetChipContainer>
          { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" color="secondary" />) }
          { budgets.length > 0 && budgets.map((budget) => (
            <Chip key={budget.id} label={budget.name} variant="outlined" color="primary" />
          ))}
        </BudgetChipContainer>
        { (!isExpense && linkedPayedRecords.length > 0) && (
        <IncomeRecord payedLinkedRecords={linkedPayedRecords} shortView={shortView} />
        )}
      </RecordContainer>
    );
  }

  return (
    <RecordContainerMobile>
      <RecordTitleMobile>{ shortName }</RecordTitleMobile>
      <RecordDateTimeContainer>
        <RecordDateTime>{ fullDate }</RecordDateTime>
        <RecordDateTime>{ formattedTime }</RecordDateTime>
      </RecordDateTimeContainer>
      { isExpense ? (
        <RecordExpenseMobile>
          -
          {' '}
          { formattedPrice }
        </RecordExpenseMobile>
      ) : (
        <RecordIncomeMobile>
          +
          {' '}
          { formattedPrice }
        </RecordIncomeMobile>
      ) }
      <BudgetChipContainer>
        { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" color="secondary" />) }
        { budgets.length > 0 && budgets.map((budget) => (
          <Chip key={budget.id} label={budget.name} variant="outlined" color="primary" />
        ))}
      </BudgetChipContainer>
      <RecordDescription>{ description }</RecordDescription>
      { (!isExpense && linkedPayedRecords.length > 0) && (
        <IncomeRecord payedLinkedRecords={linkedPayedRecords} shortView={shortView} />
      )}
    </RecordContainerMobile>
  );
};

export { Record };
