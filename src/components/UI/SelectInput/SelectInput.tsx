import { FormControl } from '@mui/material';
import { Field } from 'formik';
import { SelectFormik } from './SelectFormik';

import { ISelectInputProps } from './interface';
import { InputLabel, MenuItem } from '../../../styles';

const SelectInput = ({
  labelId, labelName, fieldName, options,
}: ISelectInputProps) => {
  const optionsIsArray = Array.isArray(options);
  const newOptions = optionsIsArray ? options : Object.keys(options);

  return (
    <FormControl variant="standard">
      <InputLabel id={labelId}>{ labelName }</InputLabel>
      <Field name={fieldName} component={SelectFormik}>
        { newOptions.map((item) => (
          <MenuItem key={`${fieldName}-${item}`} value={item}>{item}</MenuItem>
        )) }
      </Field>
    </FormControl>
  );
};

export { SelectInput };
