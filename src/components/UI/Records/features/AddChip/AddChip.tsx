import { Field, Formik } from 'formik';
import { useEffect, useState } from 'react';

import { AddChipProps } from './interface';
import { TagOrBudgetSchema } from '../../../../../validationsSchemas/records.schema';
import {
  ChipsContainer, ChipForm, AddChipButtonContainer, SecondaryButtonForm,
} from '../RecordTemplate/RecordTemplate.styled';
import {
  InputForm, Chip, FlexContainer,
} from '../../../../../styles';
import { RecordSubtitleText } from '../../Records.styled';

const AddChip = ({
  name, label, action, chipsData = [], updateData,
}: AddChipProps) => {
  const [chips, setChips] = useState<string[]>(chipsData);

  useEffect(() => {
    if (chipsData.length > 0) {
      setChips(chipsData);
    }
  }, [chipsData]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitChips = (values: any) => {
    // Add chip
    const newInfo = [...chips, values[name]];
    updateData(newInfo);
    setChips(newInfo);
  };

  const checkRepeatedValue = (value: string) => {
    let error;
    const repeatedChip = chips.find((chip) => chip === value);
    if (!repeatedChip) return error;
    error = `${value} cannot be repeated. Try a different one.`;
    return error;
  };

  const handleDeleteChip = (value: string) => {
    const newChips = chips.filter((chip) => chip !== value);
    updateData(newChips);
    setChips(newChips);
  };

  return (
    <ChipForm>
      { (chips.length === 0) && (
        <FlexContainer justifyContent="center">
          <RecordSubtitleText>{`No ${name}s added`}</RecordSubtitleText>
        </FlexContainer>
      ) }
      { (chips.length > 0) && (
        <ChipsContainer>
          { chips.map((chip) => (
            <Chip key={chip} label={chip} variant="outlined" color="primary" onDelete={() => handleDeleteChip(chip)} />
          )) }
        </ChipsContainer>
      )}
      <Formik
        initialValues={{ [name]: '' }}
        onSubmit={(values, actions) => {
          handleSubmitChips(values);
          actions.setFieldValue(name, '');
          actions.setFieldTouched(name, false);
          actions.setSubmitting(false);
        }}
        validationSchema={() => TagOrBudgetSchema(name)}
        validateOnMount
      >
        {({ submitForm }) => (
          <>
            <div>
              <Field
                component={InputForm}
                fullWidth
                name={name}
                type="text"
                variant="standard"
                label={label}
                validate={checkRepeatedValue}
              />
            </div>
            <AddChipButtonContainer>
              <SecondaryButtonForm variant="contained" onClick={submitForm} size="medium">
                Add
                {' '}
                {action}
              </SecondaryButtonForm>
            </AddChipButtonContainer>
          </>
        )}
      </Formik>
    </ChipForm>
  );
};

export { AddChip };
