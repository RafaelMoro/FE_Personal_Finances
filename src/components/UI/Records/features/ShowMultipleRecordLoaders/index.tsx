import { RecordLoading } from '../RecordLoading';

interface ShowMultipleRecordLoaderProps {
  numberOfSkeletons: number;
}

const ShowMultipleRecordLoader = ({ numberOfSkeletons = 1 }: ShowMultipleRecordLoaderProps) => {
  const skeletons = [RecordLoading];

  if (numberOfSkeletons > 1) {
    for (let index = 0; index < numberOfSkeletons; index += 1) {
      skeletons.push(RecordLoading);
    }
  }

  return (
    <>
      { skeletons.map((Skeleton) => <Skeleton key={numberOfSkeletons + 1} />) }
    </>
  );
};

export { ShowMultipleRecordLoader };
