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

}

export interface ISelectInputProps {
  labelId: string;
  labelName: string;
  fieldName: string;
  stringOptions: string[];
  colorOptions: | ITextColors[] | IBackgroundColors[];
  selectInputColors?: boolean;
}

export interface ISelectInputDynamicProps {
  backgroundColor: string;
}
