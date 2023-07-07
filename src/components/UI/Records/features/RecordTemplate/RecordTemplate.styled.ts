import styled from '@emotion/styled';
import { Form } from 'formik';
import { AnchorButton, AppColors } from '../../../../../styles';

export const RecordTemplateMain = styled.main`
  display: grid;
  padding: 1rem;
`;

export const GoBackButton = styled(AnchorButton)`
  color: ${AppColors.grey};
  justify-self: end;
`;

export const FormContainer = styled(Form)`
  display: grid;
  padding: 0 1rem 0 1rem;
  gap: 2rem;
`;

export const ChipsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
