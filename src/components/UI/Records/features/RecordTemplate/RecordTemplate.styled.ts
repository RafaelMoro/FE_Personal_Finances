import styled from '@emotion/styled';
import { Form } from 'formik';
import { ToggleButtonGroup as ToggleButtonGroupMUI } from '@mui/material';
import { AnchorButton, AppColors, SecondaryButton } from '../../../../../styles';

export const RecordTemplateMain = styled.main`
  display: grid;
  padding: 1rem;
  gap: 1rem;
`;

export const ToggleButtonGroup = styled(ToggleButtonGroupMUI)`
  justify-self: center;
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

export const AddButton = styled(SecondaryButton)`
  min-width: 15rem;
`;

export const AddChipContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(min-content, 20%));
  gap: 1rem;
`;

export const ChipsContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 1.5rem;
`;
