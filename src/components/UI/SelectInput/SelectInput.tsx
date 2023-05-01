import { FormControl } from '@mui/material';
import { Field } from 'formik';
import { SelectFormik } from './SelectFormik';

import { ISelectInputProps } from './interface';
import { InputLabel, MenuItem } from '../../../styles';
import { PersonalizedMenuItem } from './SelectInput.styled';

// This component only can be used with Formik because it was included MUI component with Formik
const SelectInput = ({
  labelId, labelName, fieldName, options, selectInputColors = false,
}: ISelectInputProps) => {
  const optionsIsArray = Array.isArray(options);
  const newOptions = optionsIsArray ? options : Object.entries(options);

  return (
    <FormControl variant="standard">
      <InputLabel id={labelId}>{ labelName }</InputLabel>
      <Field name={fieldName} component={SelectFormik}>
        { newOptions.map((item) => {
          if (selectInputColors) {
            return (
              <PersonalizedMenuItem
                backgroundColor={item[1]}
                key={`${fieldName}-${item[0]}`}
                value={item[0]}
              >
                {item[0]}
              </PersonalizedMenuItem>
            );
          }
          return (
            <MenuItem key={`${fieldName}-${item}`} value={item}>{item}</MenuItem>
          );
        }) }
      </Field>
    </FormControl>
  );
};

export { SelectInput };
