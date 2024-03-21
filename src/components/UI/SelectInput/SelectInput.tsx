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
  labelId, labelName, fieldName, stringOptions, colorOptions, accountsOptions,
  selectInputColors = false, processSelectDataFn, disabled = false,
}: SelectInputProps) => (
  <FormControl variant="standard">
    <InputLabel id={labelId}>{ labelName }</InputLabel>
    <Field disabled={disabled} processSelectDataFn={processSelectDataFn} name={fieldName} component={SelectFormik}>
      { (colorOptions.length > 0 && selectInputColors) && colorOptions.map((option) => (
        <PersonalizedMenuItem
          key={`${fieldName}-${option.name}`}
          value={option.name}
        >
          {option.name}
          <ColorCircle backgroundColor={option.color} />
        </PersonalizedMenuItem>
      )) }
      { ((accountsOptions ?? []).length > 0) && (
        (accountsOptions ?? []).map((option) => (
          <MenuItem key={`${fieldName}-${option._id}`} value={option._id}>{option.title}</MenuItem>
        ))
      ) }
      { ((stringOptions ?? []).length > 0) && (
        stringOptions.map((option, index) => (
          <MenuItem key={`${fieldName}-${option}-${index + 1}`} value={option}>{option}</MenuItem>
        ))
      ) }
    </Field>
  </FormControl>
);

export { SelectInput };
