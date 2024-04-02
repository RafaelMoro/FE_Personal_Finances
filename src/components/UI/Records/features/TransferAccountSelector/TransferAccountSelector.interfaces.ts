import { SelectFormikProps } from '../../../../../globalInterface';

export interface TransferAccountSelectorProps {
  setDestinationAsCredit: () => void;
  setDestinationAsNonCredit: () => void;
  updateDestinationAccountId: (id: string) => void;
  errorOriginAccount?: string;
  errorDestinationAccount?: string;
  touchedOriginAccount?: boolean;
  touchedDestinationAccount?: boolean;
  originAccountId: string;
}

export interface SelectDestinationAccountProps extends SelectFormikProps {
  toggleDestinationCredit: (value: string) => void;
}

export interface SelectOriginAccountProps extends SelectFormikProps {
  selectOriginAccount: (value: string) => void
}
