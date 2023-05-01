import { ReactNode } from 'react';

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
  options: string[] | object;
  selectInputColors?: boolean;
}

export interface ISelectInputDynamicProps {
  backgroundColor: string;
}
