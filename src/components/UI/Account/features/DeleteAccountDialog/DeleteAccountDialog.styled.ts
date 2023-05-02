import styled from '@emotion/styled';
import { Paragraph } from '../../../../../styles';

export const AccountDialogContainer = styled.div`
  padding: 2.4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

export const DialogParagraph = styled(Paragraph)`
  grid-column: 1 / 3;
`;
