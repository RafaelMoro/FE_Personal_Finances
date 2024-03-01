import { RecordLoading } from '../RecordLoading';

interface ShowMultipleRecordLoaderProps {
  numberOfSkeletons: number;
  keyMap: string;
}

const ShowMultipleRecordLoader = ({ keyMap, numberOfSkeletons = 1 }: ShowMultipleRecordLoaderProps) => {
  const skeletons = [RecordLoading];

  if (numberOfSkeletons > 1) {
    for (let index = 0; index < numberOfSkeletons; index += 1) {
      skeletons.push(RecordLoading);
    }
  }

  return (
    <>
      { skeletons.map((Skeleton, index) => <Skeleton key={`${keyMap}-${index + 1}`} />) }
    </>
  );
};

export { ShowMultipleRecordLoader };
