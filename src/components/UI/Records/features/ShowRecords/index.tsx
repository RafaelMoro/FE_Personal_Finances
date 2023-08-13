import { ReactElement } from 'react';
import { AnyRecord } from '../../../../../globalInterface';

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
    { (!loading && !error && records.length > 0) && records.map(renderRecords) }
  </>
);

export { ShowRecords };
