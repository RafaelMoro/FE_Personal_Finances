import { ReactElement } from 'react';
import { Divider } from '@mui/material';
import { AnyRecord } from '../../../../../globalInterface';
import { MonthAccordeon } from '../MonthAccordeon';
import { ShowRecords } from '../ShowRecords';
import { Record } from '../../Record';
import { FlexContainer, Paragraph } from '../../../../../styles';
import { RecordExpense, RecordIncome } from '../../Records.styled';
import { ShowTotalContianer } from '../Features.styled';

interface MonthRecordsProps {
  backgroundColor: string;
  color: string;
  openedAccordeon: boolean;
  titleMonthAccordeon: string;
  totalExpense: string;
  totalIncome: string;
  onClickCb?: () => Promise<void> | void;
  accountId: string;
  records: AnyRecord[];
  loading: boolean;
  error: boolean;
  onEmptyCb: () => ReactElement;
  onErrorCb: () => ReactElement;
  onLoadingCb: () => ReactElement;
}

const MonthRecords = ({
  backgroundColor, color, openedAccordeon, titleMonthAccordeon, accountId,
  records, loading, error, onEmptyCb, onLoadingCb, onErrorCb, totalExpense, totalIncome,
  onClickCb = () => {},
}: MonthRecordsProps) => (
  <MonthAccordeon
    backgroundColor={backgroundColor}
    color={color}
    opened={openedAccordeon}
    title={titleMonthAccordeon}
    accountId={accountId}
    onClickCallback={onClickCb}
  >
    <ShowTotalContianer>
      <FlexContainer gap="1">
        <Paragraph>Total Expense: </Paragraph>
        <RecordExpense>{totalExpense}</RecordExpense>
      </FlexContainer>
      <FlexContainer gap="1">
        <Paragraph>Total Income: </Paragraph>
        <RecordIncome>{totalIncome}</RecordIncome>
      </FlexContainer>
    </ShowTotalContianer>
    <ShowRecords
      records={records}
      loading={loading}
      error={error}
      onEmptyRecords={onEmptyCb}
      onErrorRecords={onErrorCb}
      onLoadingRecords={onLoadingCb}
      renderRecords={
          (record: AnyRecord, index: number) => (
            <div key={record._id}>
              { (index === 0) && (<Divider />) }
              <Record
                backgroundColor={backgroundColor}
                record={record}
              />
              <Divider />
            </div>
          )
        }
    />
  </MonthAccordeon>
);

export { MonthRecords };
