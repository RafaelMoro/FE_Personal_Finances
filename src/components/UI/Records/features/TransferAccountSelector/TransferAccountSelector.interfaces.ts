import { ReactNode } from 'react';
import { SelectFormikFieldProps, SelectFormikFormProps } from '../../../SelectInput/interface';

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

export interface SelectDestinationAccountProps {
  children: ReactNode;
  field: SelectFormikFieldProps;
  form: SelectFormikFormProps;
  selectOriginAccount: (value: string) => void
}
