import styled from '@emotion/styled';
import { Form } from 'formik';
import { ToggleButtonGroup as ToggleButtonGroupMUI } from '@mui/material';
import {
  AnchorButton, AppColors, CancelButton, PrimaryButton, SecondaryButton,
} from '../../../../../styles';

export const RecordTemplateMain = styled.main`
  display: grid;
  padding: 1rem;
  gap: 1rem;
  max-width: 90rem;
  margin: 0 auto;
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

export const PrimaryButtonForm = styled(PrimaryButton)`
  min-width: 18rem;
  order: 1;

  @media(min-width: 480px) {
    order: 2;
  }
`;

export const AnchorButtonForm = styled(AnchorButton)`
  display: flex;
  order: 2;

  @media(min-width: 480px) {
    order: 1;
  }
`;

export const CancelButtonForm = styled(CancelButton)`
  min-width: 18rem;
`;

export const SecondaryButtonForm = styled(SecondaryButton)`
  min-width: 18rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  @media(min-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const AddChipContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 1.5rem;
`;

export const ShowIndebtedPeopleContainer = styled.div`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

/** ChipForm */
export const ChipForm = styled.div`
  display: grid;
  gap: 3rem;
  margin: 2rem 0;
`;

export const ChipsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(min-content, 20%));
  justify-content: center;
  gap: 1rem;
`;

export const AddChipButtonContainer = styled.div`
  margin: 0 auto;
`;
