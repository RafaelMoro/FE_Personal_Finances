import { ReactNode } from 'react';
import { MainRecordDataBox, RecordTitle, TitleContainer } from '../../Records.styled';

interface MainRecordDataPros {
  amountShown: JSX.Element;
  categoryIcon: JSX.Element;
  shortName: string;
  children: ReactNode;
}

const MainRecordData = ({
  amountShown, categoryIcon, children, shortName,
}: MainRecordDataPros) => (
  <MainRecordDataBox>
    <TitleContainer>
      { categoryIcon }
      <RecordTitle variant="subtitle1">{ shortName }</RecordTitle>
    </TitleContainer>
    { amountShown }
    { children }
  </MainRecordDataBox>
);

export { MainRecordData };
