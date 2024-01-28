import { ActionButtonPanelProps } from './interface';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import {
  ButtonContainer, AnchorButtonForm, CancelButtonForm, PrimaryButtonForm,
} from './ActionButtonPanel.styled';

const ActionButtonPanel = ({
  route, minWidthNumber, buttonText, loading, submitForm,
}: ActionButtonPanelProps) => (
  <ButtonContainer>
    <AnchorButtonForm to={route}>
      <CancelButtonForm minWidth={minWidthNumber} variant="contained" size="medium">Cancel</CancelButtonForm>
    </AnchorButtonForm>
    <PrimaryButtonForm minWidth={minWidthNumber} variant="contained" onClick={submitForm} size="medium">
      { (loading) ? (<LoadingSpinner />) : buttonText }
    </PrimaryButtonForm>
  </ButtonContainer>
);

export { ActionButtonPanel };
