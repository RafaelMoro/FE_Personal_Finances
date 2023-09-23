import { ReactElement } from 'react';
import { AnyRecord } from '../../../../../globalInterface';
import { MonthRecordBox } from '../../Records.styled';

interface ShowRecordsProps {
  records: AnyRecord[];
  loading: boolean;
  error: boolean;
  onEmptyRecords: () => ReactElement;
  onLoadingRecords: () => ReactElement;
  onErrorRecords: () => ReactElement;
  renderRecords: (record: AnyRecord, index: number) => ReactElement;
}

const ShowRecords = ({
  records, loading, error, onEmptyRecords, onLoadingRecords, onErrorRecords, renderRecords,
}: ShowRecordsProps) => (
  <>
    { (loading) && onLoadingRecords() }
    { (error) && onErrorRecords() }
    { (!loading && !error && records.length === 0) && onEmptyRecords() }
    { (!loading && !error && records.length > 0) && (
      <MonthRecordBox>
        { records.map(renderRecords) }
      </MonthRecordBox>
    ) }
  </>
);

export { ShowRecords };
