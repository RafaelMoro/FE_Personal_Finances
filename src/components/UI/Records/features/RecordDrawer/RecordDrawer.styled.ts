import styled from '@emotion/styled';
import { Table, Typography, TypographyProps } from '@mui/material';

import {
  RecordStatusTypeColors,
  responsiveBreakpoints,
} from '../../../../../styles';
import { ChipContainer, PaymentStatusChip, RecordSubtitleText } from '../../Records.styled';
import { RecordTableProps } from '../../interface';
import { appTheme } from '../../../../../styles/theme';
import { RecordStatusType } from '../../../../../aliasType';

export const RecordDrawerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: ${appTheme.spacing(3)};
  justify-content: center;
  gap: ${appTheme.spacing(2)};
  row-gap: ${appTheme.spacing(4)};

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    min-width: 47rem;
  }
`;

export const DrawerTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${appTheme.spacing(3)};
  grid-column: 1 / 3;
`;

export const DrawerCloseBox = styled.div`
  cursor: pointer;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  justify-self: end;
`;

export const DrawerDate = styled(Typography)`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  align-self: center;
  justify-self: center;
`;

export const RecordDrawerTitle = styled(Typography)`
  grid-column: 1 / 3;
`;

export const DrawerTypographyBold = styled(Typography)<TypographyProps & { component: React.ElementType }>`
  font-weight: bold;
`;

export const RecordDrawerDescription = styled(RecordSubtitleText)`
  grid-column: 1 / 3;
`;

export const PaymentStatusChipDrawer = styled(PaymentStatusChip, { shouldForwardProp: (props) => props !== 'status' })`
  background-color: ${({ status }: { status: RecordStatusType }) => (RecordStatusTypeColors[status])};
  grid-column: 1 / 3;
  place-self: center;
`;

export const TableTitle = styled(Typography, { shouldForwardProp: (props) => props !== 'isGrid' })`
  ${({ isGrid = false }: RecordTableProps) => (isGrid && 'grid-column: 1 / 3;')}
`;

export const TableNote = styled(Typography)`
  text-align: justify;
`;

export const RecordDrawerPriceContainer = styled.div`
  text-align: center;
  grid-column: 1 / 3;
`;

export const TransferInformation = styled(Typography)`
  grid-column: 1 / 3;
  text-align: center;
`;

export const RecordTable = styled(Table, { shouldForwardProp: (props) => props !== 'isGrid' })`
  ${(props: RecordTableProps) => (props.isGrid && 'grid-column: 1 / 3;')}
`;

export const DrawerChipContainer = styled(ChipContainer)`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;
