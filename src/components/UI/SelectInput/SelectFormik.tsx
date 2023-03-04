import { ReactNode } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { Select } from '../../../styles';

interface ISelectFormikField {
  name: string;
  value: string;
}

interface ISelectFormikForm {
  setFieldValue: (name: string, value: string) => void;
}

interface ISelectFormikProps {
  children: ReactNode;
  field: ISelectFormikField;
  form: ISelectFormikForm;

}

const SelectFormik = ({
  children, form, field,
}: ISelectFormikProps) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: SelectChangeEvent<any>) => setFieldValue(name, event.target.value);

  // Estilar select
  return (
    <Select
      name={name}
      value={value}
      onChange={handleChange}
    >
      { children }
    </Select>
  );
};

export { SelectFormik };
