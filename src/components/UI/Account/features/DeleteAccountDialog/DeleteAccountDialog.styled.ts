import styled from '@emotion/styled';
import { DialogTitle, IconButton, Typography } from '@mui/material';
import { AppColors } from '../../../../../styles';

export const AccountDialogContainer = styled.div`
  padding: 2.4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

export const DeleteAccountTitle = styled(DialogTitle)`
  justify-self: center;
  grid-column: 1 / 3;
  grid-row: 1 / 2;
`;

export const DeleteAccountIconButton = styled(IconButton)`
  justify-self: end;
  grid-column: 1 / 3;
  grid-row: 1 / 2;
`;

export const DialogParagraph = styled(Typography)`
  grid-column: 1 / 3;
`;

export const DialogParagraphWarning = styled(DialogParagraph)`
  color: ${AppColors.negative};
`;
