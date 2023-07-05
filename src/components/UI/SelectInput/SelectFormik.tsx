/* eslint-disable no-console */
import { useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { useAtom } from 'jotai';

import { Select } from '../../../styles';
import { ISelectFormikProps } from './interface';
import { selectInputInfoAtom } from '../../../atoms';

const SelectFormik = ({
  children, form, field,
}: ISelectFormikProps) => {
  const { name, value } = field;
  const [, setSelectInputInfo] = useAtom(selectInputInfoAtom);
  const { setFieldValue } = form;

  useEffect(() => {
    setSelectInputInfo({
      name,
      value,
    });
  }, [name, setSelectInputInfo, value]);

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
