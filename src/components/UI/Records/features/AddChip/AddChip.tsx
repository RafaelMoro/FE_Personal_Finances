import { Field, Formik } from 'formik';
import { useState } from 'react';

import { AddChipProps } from './interface';
import { TagOrBudgetSchema } from '../../../../../validationsSchemas/records.schema';
import {
  InputForm, SecondaryButton, Chip, FlexContainer,
} from '../../../../../styles';

const AddChip = ({
  name, label, action, updateData,
}: AddChipProps) => {
  const [chips, setChips] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitChips = (values: any) => {
    // Add chip
    const newInfo = [...chips, values[name]];
    updateData(newInfo);
    setChips(newInfo);
  };

  return (
    <FlexContainer gap="3" justifyContent="center">
      <Formik
        initialValues={{ [name]: '' }}
        onSubmit={(values, actions) => {
          handleSubmitChips(values);
          actions.setFieldValue(name, '');
          actions.setSubmitting(false);
        }}
        validationSchema={() => TagOrBudgetSchema(name)}
        validateOnMount
      >
        {({ submitForm }) => (
          <>
            <Field
              component={InputForm}
              name={name}
              type="text"
              variant="standard"
              label={label}
            />
            <SecondaryButton variant="contained" onClick={submitForm} size="medium">
              Add
              {' '}
              {action}
            </SecondaryButton>
          </>
        )}
      </Formik>
      { (chips.length === 0) && (<Chip label={`No ${name}s added`} variant="outlined" color="primary" />) }
      { (chips.length > 0) && chips.map((chip, index) => (
        <Chip key={`${chip}-${index + 1}`} label={chip} variant="outlined" color="primary" />
      ))}
    </FlexContainer>
  );
};

export { AddChip };
