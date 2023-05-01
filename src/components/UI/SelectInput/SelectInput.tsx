import { FormControl } from '@mui/material';
import { Field } from 'formik';
import { SelectFormik } from './SelectFormik';

import { ISelectInputProps } from './interface';
import { InputLabel, MenuItem } from '../../../styles';
import { PersonalizedMenuItem } from './SelectInput.styled';

// This component only can be used with Formik because it was included MUI component with Formik
const SelectInput = ({
  labelId, labelName, fieldName, stringOptions, colorOptions, selectInputColors = false,
}: ISelectInputProps) => (
  <FormControl variant="standard">
    <InputLabel id={labelId}>{ labelName }</InputLabel>
    <Field name={fieldName} component={SelectFormik}>
      { (colorOptions.length > 0) && colorOptions.map((option) => {
        if (selectInputColors) {
          return (
            <PersonalizedMenuItem
              backgroundColor={option.color}
              key={`${fieldName}-${option.name}`}
              value={option.name}
            >
              {option.name}
            </PersonalizedMenuItem>
          );
        }
        return (
          <MenuItem key={`${fieldName}-${option.name}`} value={option.name}>{option.name}</MenuItem>
        );
      }) }
      { (stringOptions.length > 0) && (
        stringOptions.map((option) => (
          <MenuItem key={`${fieldName}-${option}`} value={option}>{option}</MenuItem>
        ))
      ) }
    </Field>
  </FormControl>
);

export { SelectInput };
