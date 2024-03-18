export type ClickableElement = 'Button' | 'Link';

export interface ActionButtonPanelProps {
  minWidthNumber: string;
  submitButtonText: string;
  actionDataTestId: string;
  submitForm?: () => void;
  routeCancelButton?: string;
  disableCancelButton?: boolean;
  disableSubmitButton?: boolean;
  routeSubmitButton?: string;
  useSecondaryButton?: boolean;
  loading?: boolean;
  success?: boolean;
  cancelButton?: ClickableElement;
  cancelButtonText?: string;
  cancelButtonCallback?: () => void;
  submitButton?: ClickableElement;
}

export interface ButtonPanelProps {
  minWidth: string;
}
