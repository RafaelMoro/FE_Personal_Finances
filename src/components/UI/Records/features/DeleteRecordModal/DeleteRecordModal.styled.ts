import styled from '@emotion/styled';
import { Paragraph, ErrorParagraphValidation } from '../../../../../styles';

export const DeleteRecordContainer = styled.div`
  padding: 3rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

export const DeleteRecordTitle = styled(Paragraph)`
  grid-column: 1 / 3;
`;

export const DeleteRecordWarn = styled(ErrorParagraphValidation)`
  grid-column: 1 / 3;
  text-align: center;
`;
