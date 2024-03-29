import { ReactNode } from 'react';
import { TextColors, BackgroundColors } from '../../../styles/interface';
import { SelectFormikProps } from '../../../globalInterface';

export interface GeneralSelectFormikProps extends SelectFormikProps {
  // Callback to do any action depending on the name and value of the select input
  processSelectDataFn?: (name: string, value: string | string[]) => void;
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
