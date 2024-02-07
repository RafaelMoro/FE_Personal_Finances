export type ClickableElement = 'Button' | 'Link';

export interface ActionButtonPanelProps {
  minWidthNumber: string;
  submitButtonText: string;
  submitForm?: () => void;
  routeCancelButton?: string;
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
