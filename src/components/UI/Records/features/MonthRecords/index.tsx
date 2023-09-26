import { ReactElement } from 'react';
import { Divider } from '@mui/material';
import { AnyRecord } from '../../../../../globalInterface';
import { MonthAccordeon } from '../MonthAccordeon';
import { ShowRecords } from '../ShowRecords';
import { Record } from '../../Record';

interface MonthRecordsProps {
  backgroundColor: string;
  color: string;
  openedAccordeon: boolean;
  titleMonthAccordeon: string;
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
  records, loading, error, onEmptyCb, onLoadingCb, onErrorCb,
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
                _id={record._id}
                shortName={record.shortName}
                description={record.description}
                category={record.category}
                subCategory={record.subCategory}
                tag={record.tag}
                indebtedPeople={record.indebtedPeople}
                budgets={record.budgets}
                fullDate={record.fullDate}
                formattedTime={record.formattedTime}
                amount={record.amount}
                isPaid={record.isPaid}
                expensesPaid={record.expensesPaid}
                date={record.date}
                account={record.account}
                amountFormatted={record.amountFormatted}
              />
              <Divider />
            </div>
          )
        }
    />
  </MonthAccordeon>
);

export { MonthRecords };
