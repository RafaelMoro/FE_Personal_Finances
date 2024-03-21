import { ReactNode } from 'react';
import { TextColors, BackgroundColors } from '../../../styles/interface';

export interface SelectFormikFieldProps {
  name: string;
  value: string;
}

export interface SelectFormikFormProps {
  setFieldValue: (name: string, value: string) => void;
}

export interface SelectFormikProps {
  children: ReactNode;
  field: SelectFormikFieldProps;
  form: SelectFormikFormProps;
  // Callback to do any action depending on the name and value of the select input
  processSelectDataFn?: (name: string, value: string | string[]) => void;
  disabled?: boolean;
}

export interface SelectAccount {
  _id: string;
  title: string;
}

export interface SelectInputProps {
  labelId: string;
  labelName: string | ReactNode;
  fieldName: string;
  stringOptions: string[];
  accountsOptions?: SelectAccount[];
  colorOptions: | TextColors[] | BackgroundColors[];
  selectInputColors?: boolean;
  // Callback to do any action depending on the name and value of the select input
  processSelectDataFn?: (name: string, value: string | string[]) => void;
  disabled?: boolean;
}

export interface SelectInputDynamicProps {
  backgroundColor: string;
}
