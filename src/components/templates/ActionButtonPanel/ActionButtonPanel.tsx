import { ActionButtonPanelProps } from './interface';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import {
  ButtonContainer, AnchorButtonForm, CancelButtonForm, PrimaryButtonForm,
} from './ActionButtonPanel.styled';
import { TickMark } from '../../UI/Icons';
import { AppColors } from '../../../styles';

const ActionButtonPanel = ({
  route, minWidthNumber, buttonText, success, loading, submitForm,
}: ActionButtonPanelProps) => (
  <ButtonContainer>
    <AnchorButtonForm to={route}>
      <CancelButtonForm minWidth={minWidthNumber} variant="contained" size="medium">Cancel</CancelButtonForm>
    </AnchorButtonForm>
    <PrimaryButtonForm minWidth={minWidthNumber} variant="contained" onClick={submitForm} size="medium">
      { (loading && !success) && (<LoadingSpinner />) }
      { (!loading && success) && (<TickMark fillColor={AppColors.white} />) }
      { (!loading && !success) && buttonText }
    </PrimaryButtonForm>
  </ButtonContainer>
);

export { ActionButtonPanel };
