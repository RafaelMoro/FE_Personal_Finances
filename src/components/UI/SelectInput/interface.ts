import { ReactNode } from 'react';
import { ITextColors, IBackgroundColors } from '../../../styles/interface';

interface ISelectFormikField {
  name: string;
  value: string;
}

interface ISelectFormikForm {
  setFieldValue: (name: string, value: string) => void;
}

export interface ISelectFormikProps {
  children: ReactNode;
  field: ISelectFormikField;
  form: ISelectFormikForm;
  // Callback to do any action depending on the name and value of the select input
  processSelectDataFn?: (name: string, value: string | string[]) => void;
}

export interface ISelectInputProps {
  labelId: string;
  labelName: string;
  fieldName: string;
  stringOptions: string[];
  colorOptions: | ITextColors[] | IBackgroundColors[];
  selectInputColors?: boolean;
  // Callback to do any action depending on the name and value of the select input
  processSelectDataFn?: (name: string, value: string | string[]) => void;
}

export interface ISelectInputDynamicProps {
  backgroundColor: string;
}
