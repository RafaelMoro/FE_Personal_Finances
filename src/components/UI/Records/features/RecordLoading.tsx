import { RecordSkeletonContainer, RecordSkeletonHolder } from '../Records.styled';

const RecordLoading = () => (
  <RecordSkeletonContainer>
    <RecordSkeletonHolder />
    <RecordSkeletonHolder />
    <RecordSkeletonHolder />
    <RecordSkeletonHolder />
  </RecordSkeletonContainer>
);

export { RecordLoading };
