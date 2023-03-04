import { SelectChangeEvent } from '@mui/material';

import { Select } from '../../../styles';
import { ISelectFormikProps } from './interface';

const SelectFormik = ({
  children, form, field,
}: ISelectFormikProps) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: SelectChangeEvent<any>) => setFieldValue(name, event.target.value);

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
