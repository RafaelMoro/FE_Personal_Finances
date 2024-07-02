import { SelectChangeEvent } from '@mui/material';
import { Select } from '../../../../../styles';
import { SelectCategoryProps } from '../../interface';

const SelectCategory = ({
  children, field, form, setNewCategory, dataTestId,
}: SelectCategoryProps) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: SelectChangeEvent<any>) => {
    setNewCategory(event.target.value);
    setFieldValue('subCategory', '');
    setFieldValue(name, event.target.value);
  };

  return (
    <Select
      name={name}
      value={value}
      data-testid={dataTestId}
      onChange={handleChange}
    >
      { children }
    </Select>
  );
};

export { SelectCategory };
