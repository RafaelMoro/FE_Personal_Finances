import styled from '@emotion/styled';
import { Table } from '@mui/material';

import {
  AppColors, Paragraph, ParagraphTitle, Sub,
} from '../../../../../styles';
import { ChipContainer, RecordDateTime, RecordSubtitleText } from '../../Records.styled';
import { DrawerChipContainerProps, RecordTableProps } from '../../interface';

export const RecordDrawerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 2rem;
  justify-content: center;
  gap: 1rem;
  row-gap: 2rem;

  @media(min-width: 480px) {
    min-width: 47rem;
  }
`;

export const DrawerTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  grid-column: 1 / 3;
`;

export const DrawerCloseBox = styled.div`
  cursor: pointer;
  grid-column: 2 / 3;
  justify-self: end;
`;

export const RecordDrawerTitle = styled(ParagraphTitle)`
  text-align: center;
  grid-column: 1 / 3;
`;

export const RecordDrawerDatetime = styled(RecordDateTime)`
  text-align: center;
`;

export const RecordDrawerText = styled(RecordSubtitleText)`
  text-align: center;
`;

export const RecordDrawerDescription = styled(RecordSubtitleText)`
  grid-column: 1 / 3;
`;

export const TableTitle = styled(Paragraph, { shouldForwardProp: (props) => props !== 'isGrid' })`
  ${({ isGrid = false }: RecordTableProps) => (isGrid && 'grid-column: 1 / 3;')}
  text-align: center;
`;

export const TableNote = styled(Sub)`
  color: ${AppColors.subtitleColor};
  text-align: justify;
`;

export const RecordDrawerPriceContainer = styled.div`
  text-align: center;
  grid-column: 1 / 3;
`;

export const RecordTable = styled(Table, { shouldForwardProp: (props) => props !== 'isGrid' })`
  ${(props: RecordTableProps) => (props.isGrid && 'grid-column: 1 / 3;')}
`;

export const DrawerChipContainer = styled(ChipContainer)`
  grid-template-columns: repeat(5, 1fr);
  position: relative;
  border: 0.1rem solid ${AppColors.bgColorGrey};
  padding: 1.5rem;
  border-radius: 1rem;

  &:after {
    content: '${(props: DrawerChipContainerProps) => props.afterContent}';
    position: absolute;
    top: -1rem;
    left: 1.6rem;
    bottom: 0;
    right: 0;
    height: 1rem;
    width: 6rem;
    background-color: white;
    font-size: 1.5rem;
    color: ${AppColors.grey};
  }
`;
