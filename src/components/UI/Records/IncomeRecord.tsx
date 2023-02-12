import { Divider } from '@mui/material';
import { formatDateToString } from '../../../utils/FormatDateToString';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';
import { Paragraph } from '../../../styles';
import {
  RecordDateTime, RecordExpense, ExpensesPayed, Expense,
} from './Records.styled';
import { IIncomeRecordProps } from './interface';

const IncomeRecord = ({ payedLinkedRecords = [], shortView = true }: IIncomeRecordProps) => {
  if (!shortView) {
    const payedRecordsFormattedDateTime = payedLinkedRecords.map((record) => {
      const { date, price } = record;
      const newPrice = formatNumberToCurrency(price);
      const dateFormatted = formatDateToString(date);
      return { ...record, date: dateFormatted, price: newPrice };
    });
    return (
      <ExpensesPayed>
        <Paragraph>Expenses payed:</Paragraph>
        { payedLinkedRecords.length > 0 && payedRecordsFormattedDateTime.map((payedRecord) => (
          <>
            <Expense key={payedRecord.id}>
              <Paragraph>{payedRecord.shortName}</Paragraph>
              <RecordDateTime>{payedRecord.date.fullDate}</RecordDateTime>
              <RecordDateTime>{payedRecord.date.formattedTime}</RecordDateTime>
              <RecordExpense>
                -
                {' '}
                { payedRecord.price }
              </RecordExpense>
            </Expense>
            <Divider />
          </>
        )) }
      </ExpensesPayed>
    );
  }

  return (
    <Paragraph>
      Number of expenses payed:
      {' '}
      { payedLinkedRecords.length }
    </Paragraph>
  );
};

export { IncomeRecord };
