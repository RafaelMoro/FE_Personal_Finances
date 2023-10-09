import { Divider } from '@mui/material';
import { ListItemRecord, RecordSkeletonHolder, RecordLoadingBox } from '../../Records.styled';

const RecordLoading = () => (
  <RecordLoadingBox>
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
