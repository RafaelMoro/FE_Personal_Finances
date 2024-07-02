import { Divider } from '@mui/material';
import { ListItemRecord, RecordSkeletonHolder, RecordLoadingBox } from '../../Records.styled';

const RecordLoading = () => (
  <RecordLoadingBox data-testid="record-loading-skeleton">
    <Divider />
    <ListItemRecord>
      <RecordSkeletonHolder />
      <RecordSkeletonHolder />
      <RecordSkeletonHolder />
      <RecordSkeletonHolder />
    </ListItemRecord>
    <Divider />
  </RecordLoadingBox>
);

export { RecordLoading };
