import { Divider } from '@mui/material';
import { RecordContainer, RecordSkeletonHolder, RecordLoadingBox } from '../Records.styled';

const RecordLoading = () => (
  <RecordLoadingBox>
    <Divider />
    <RecordContainer>
      <RecordSkeletonHolder />
      <RecordSkeletonHolder />
      <RecordSkeletonHolder />
      <RecordSkeletonHolder />
    </RecordContainer>
    <Divider />
  </RecordLoadingBox>
);

export { RecordLoading };
