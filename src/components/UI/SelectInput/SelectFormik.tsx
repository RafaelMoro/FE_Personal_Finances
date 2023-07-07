/* eslint-disable no-console */
import { useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';

import { Select } from '../../../styles';
import { ISelectFormikProps } from './interface';

const SelectFormik = ({
  children, form, field, processSelectDataFn, disabled = false,
}: ISelectFormikProps) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  useEffect(() => {
    // This callback is to do any action depending of the name and value from the select field.
    if (processSelectDataFn) processSelectDataFn(name, value);
  }, [processSelectDataFn, name, value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: SelectChangeEvent<any>) => setFieldValue(name, event.target.value);

  return (
    <Select
      name={name}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    >
      { children }
    </Select>
  );
};

export { SelectFormik };
