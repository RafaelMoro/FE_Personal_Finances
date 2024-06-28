import { ReactElement } from 'react';
import { Divider, Typography } from '@mui/material';
import { AnyRecord } from '../../../../../globalInterface';
import { MonthAccordeon } from '../MonthAccordeon';
import { ShowRecords } from '../ShowRecords';
import { Record } from '../../Record';
import { FlexContainer } from '../../../../../styles';
import { RecordExpense, RecordIncome } from '../../Records.styled';
import { ShowTotalContianer } from '../Features.styled';

interface MonthRecordsProps {
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
  isGuestUser: boolean;
  onEmptyCb: () => ReactElement;
  onErrorCb: () => ReactElement;
  onLoadingCb: () => ReactElement;
}

const MonthRecords = ({
  color, openedAccordeon, titleMonthAccordeon, accountId, isGuestUser,
  records, loading, error, onEmptyCb, onLoadingCb, onErrorCb, totalExpense, totalIncome,
  onClickCb = () => {},
}: MonthRecordsProps) => (
  <MonthAccordeon
    color={color}
    opened={openedAccordeon}
    title={titleMonthAccordeon}
    accountId={accountId}
    onClickCallback={onClickCb}
  >
    { (!isGuestUser) && (
      <ShowTotalContianer>
        <FlexContainer gap={2}>
          <Typography>Total Expense: </Typography>
          <RecordExpense>{totalExpense}</RecordExpense>
        </FlexContainer>
        <FlexContainer gap={2}>
          <Typography>Total Income: </Typography>
          <RecordIncome>{totalIncome}</RecordIncome>
        </FlexContainer>
      </ShowTotalContianer>
    ) }
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
                backgroundColor={color}
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
