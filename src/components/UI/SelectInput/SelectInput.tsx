import { FormControl } from '@mui/material';
import { Field } from 'formik';
import { SelectFormik } from './SelectFormik';

import { SelectInputProps } from './interface';
import { InputLabel, MenuItem } from '../../../styles';
import { ColorCircle, PersonalizedMenuItem } from './SelectInput.styled';

/*
** This component only can be used with Formik because it was included MUI component with Formik
** Passing processSelectDataFn to Field as other props that Field does not need, it will pass to
** the component prop that is the SelectFormik component.
** The processSelectDataFn is a callback to do any action needed depending on
** the value and name of the select input
*/
const SelectInput = ({
  labelId, labelName, fieldName, stringOptions, colorOptions,
  selectInputColors = false, disabled = false,
}: SelectInputProps) => (
  <FormControl variant="standard">
    <InputLabel id={labelId}>{ labelName }</InputLabel>
    <Field
      disabled={disabled}
      name={fieldName}
      component={SelectFormik}
    >
      { (colorOptions && colorOptions.length > 0 && selectInputColors) && colorOptions.map((option) => (
        <PersonalizedMenuItem
          key={`${fieldName}-${option.name}`}
          value={option.name}
        >
          {option.name}
          <ColorCircle backgroundColor={option.color} />
        </PersonalizedMenuItem>
      )) }
      { ((stringOptions ?? []).length > 0) && (
        stringOptions.map((option, index) => (
          <MenuItem key={`${fieldName}-${option}-${index + 1}`} value={option}>{option}</MenuItem>
        ))
      ) }
    </Field>
  </FormControl>
);

export { SelectInput };
