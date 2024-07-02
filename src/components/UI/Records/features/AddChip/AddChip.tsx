import { Field, Formik } from 'formik';

import { TagOrBudgetSchema } from '../../../../../validationsSchemas/records.schema';
import {
  ChipsContainer, ChipForm, AddChipButtonContainer, SecondaryButtonForm,
} from '../RecordTemplate/RecordTemplate.styled';
import {
  InputForm, Chip, FlexContainer,
} from '../../../../../styles';
import { RecordSubtitleText } from '../../Records.styled';

interface AddChipProps {
  name: string;
  label: string
  action: string;
  chipsData?: string[];
  updateData: (newInfo: string[]) => void;
}

const AddChip = ({
  name, label, action, chipsData = [], updateData,
}: AddChipProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitChips = (values: any) => {
    // Add chip
    const newInfo = [...chipsData, values[name]];
    updateData(newInfo);
  };

  const showError = (value: string) => {
    let error;
    if (chipsData.length > 7) {
      error = `You cannot add more than 8 ${name}s.`;
      return error;
    }

    const repeatedChip = chipsData.find((chip) => chip === value);
    if (!repeatedChip) return error;
    error = `${value} cannot be repeated. Try a different one.`;
    return error;
  };

  const handleDeleteChip = (value: string) => {
    const newChips = chipsData.filter((chip) => chip !== value);
    updateData(newChips);
  };

  return (
    <ChipForm>
      { (chipsData.length === 0) && (
        <FlexContainer justifyContent="center">
          <RecordSubtitleText variant="body2">{`No ${name}s added`}</RecordSubtitleText>
        </FlexContainer>
      ) }
      { (chipsData.length > 0) && (
        <ChipsContainer>
          { chipsData.map((chip) => (
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
                validate={showError}
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
