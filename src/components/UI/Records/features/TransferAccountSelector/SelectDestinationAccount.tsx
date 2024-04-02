import { SelectChangeEvent } from '@mui/material';
import { Select } from '../../../../../styles';
import { SelectDestinationAccountProps } from './TransferAccountSelector.interfaces';

const SelectDestinationAccount = ({
  children, field, form, toggleDestinationCredit,
}: SelectDestinationAccountProps) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: SelectChangeEvent<any>) => {
    toggleDestinationCredit(event.target.value);
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

export { SelectDestinationAccount };
