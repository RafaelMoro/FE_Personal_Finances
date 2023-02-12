import { Paragraph, ParagraphTitle } from '../../../styles';
import { RecordDateTime, RecordExpense } from './Records.styled';
import { IIncomeRecordProps } from './interface';

const IncomeRecord = ({ payedLinkedRecords, shortView = false }: IIncomeRecordProps) => {
  if (shortView) {
    return (
      <Paragraph>
        {' '}
        Number of expenses payed:
        { payedLinkedRecords.length }
      </Paragraph>
    );
  }
  return (
    <>
      <Paragraph>Expenses payed:</Paragraph>
      { payedLinkedRecords.length > 0 && payedLinkedRecords.map((payedRecord) => (
        <div key={payedRecord.id}>
          <ParagraphTitle>{payedRecord.shortName}</ParagraphTitle>
          <RecordExpense>
            -
            {' '}
            { payedRecord.price }
          </RecordExpense>
        </div>
      )) }
    </>
  );
};

export { IncomeRecord };
