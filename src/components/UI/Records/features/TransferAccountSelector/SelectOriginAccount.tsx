import { SelectChangeEvent } from '@mui/material';
import { Select } from '../../../../../styles';
import { SelectOriginAccountProps } from './TransferAccountSelector.interfaces';

const SelectOriginAccount = ({
  children, field, form, selectOriginAccount,
}: SelectOriginAccountProps) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: SelectChangeEvent<any>) => {
    selectOriginAccount(event.target.value);
    setFieldValue('destinationAccount', '');
    setFieldValue(name, event.target.value);
  };

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

export { SelectOriginAccount };
