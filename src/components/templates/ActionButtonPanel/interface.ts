export interface ActionButtonPanelProps {
  route: string;
  minWidthNumber: string;
  buttonText: string;
  loading: boolean;
  submitForm: () => void;
}

export interface ButtonPanelProps {
  minWidth: string;
}
