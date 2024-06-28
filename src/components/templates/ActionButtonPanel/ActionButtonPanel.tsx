import { ActionButtonPanelProps } from './interface';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import {
  ButtonContainer, AnchorCancelButton, CancelButtonForm, PrimaryButtonForm, AnchorSubmitButton, SecondaryButtonForm,
} from './ActionButtonPanel.styled';
import { AppIcon } from '../../UI/Icons';
import { AppColors } from '../../../styles';
import { DASHBOARD_ROUTE } from '../../../pages/RoutesConstants';

const ActionButtonPanel = ({
  routeCancelButton = DASHBOARD_ROUTE,
  cancelStateLink = {},
  routeSubmitButton = DASHBOARD_ROUTE,
  disableCancelButton = false,
  disableSubmitButton = false,
  actionDataTestId,
  minWidthNumber,
  submitButtonText,
  submitForm = () => {},
  success = false,
  loading = false,
  useSecondaryButton = false,
  cancelButton = 'Link',
  cancelButtonText = 'Cancel',
  cancelButtonCallback = () => {},
  submitButton = 'Button',
}: ActionButtonPanelProps) => {
  const CancelButton = useSecondaryButton ? SecondaryButtonForm : CancelButtonForm;

  return (
    <ButtonContainer>
      { (cancelButton === 'Link') && (
      <AnchorCancelButton to={routeCancelButton} state={cancelStateLink}>
        <CancelButton disabled={disableCancelButton} minWidth={minWidthNumber} variant="contained" size="medium">{cancelButtonText}</CancelButton>
      </AnchorCancelButton>
      ) }
      { (cancelButton === 'Button') && (
      <CancelButton
        minWidth={minWidthNumber}
        variant="contained"
        onClick={cancelButtonCallback}
        size="medium"
        disabled={disableCancelButton}
      >
          {cancelButtonText}
      </CancelButton>
      ) }
      { (submitButton === 'Button') && (
      <PrimaryButtonForm
        data-testid={actionDataTestId}
        disabled={disableSubmitButton}
        minWidth={minWidthNumber}
        variant="contained"
        onClick={submitForm}
        size="medium"
      >
        { (loading && !success) && (<LoadingSpinner />) }
        { (!loading && success) && (<AppIcon icon="TickMark" fillColor={AppColors.white} />) }
        { (!loading && !success) && submitButtonText }
      </PrimaryButtonForm>
      ) }
      { (submitButton === 'Link') && (
      <AnchorSubmitButton to={routeSubmitButton}>
        <PrimaryButtonForm minWidth={minWidthNumber} variant="contained" size="medium">{submitButtonText}</PrimaryButtonForm>
      </AnchorSubmitButton>
      ) }
    </ButtonContainer>
  );
};

export { ActionButtonPanel };
