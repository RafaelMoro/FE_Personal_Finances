import { Dialog } from '@mui/material';
import { Field, Formik } from 'formik';
import { Switch } from 'formik-mui';
import { Close } from '@mui/icons-material';

import { IndebtedPeopleFormSchema } from '../../../../../validationsSchemas/records.schema';
import { FormContainer } from '../RecordTemplate/RecordTemplate.styled';
import {
  ParagraphTitle, PrimaryButton, InputForm, InputAdornment,
  FormControlLabel, TransparentButton, FlexContainer,
} from '../../../../../styles';
import { IndebtedPeople } from '../../../../../globalInterface';
import { AddIndebtedPersonProps } from './interface';
import { Container } from './AddIndebtedPeople.styled';

const AddIndebtedPerson = ({
  open, onClose, addPerson, indebtedPeople = [], indebtedPerson, modifyAction, updatePerson,
}: AddIndebtedPersonProps) => {
  const initialValues = modifyAction ? {
    name: indebtedPerson?.name as string,
    amount: indebtedPerson?.amount as number,
    amountPaid: indebtedPerson?.amountPaid as number,
    isPaid: indebtedPerson?.isPaid as boolean,
  } : {
    name: '',
    amount: 0,
    amountPaid: 0,
    isPaid: false,
  };

  const checkRepeatedValue = (name: string) => {
    let error;
    // Do not check if the name is repeated because the user wants to modify that person.
    if (modifyAction) return error;

    const repeatedName = indebtedPeople.find((person) => person.name.toLowerCase() === name.toLowerCase());
    if (!repeatedName) return error;
    error = `${name} cannot be repeated. Try a different one.`;
    return error;
  };

  const handleSubmit = (values: IndebtedPeople) => {
    if (modifyAction) {
      updatePerson(values);
      onClose();
      return;
    }
    addPerson(values);
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <Container>
        <FlexContainer justifyContent="space-between">
          <ParagraphTitle>
            { (modifyAction) ? 'Modify' : 'Add' }
            {' '}
            Person
          </ParagraphTitle>
          <TransparentButton onClick={onClose}>
            <Close sx={{ fontSize: '3.5rem' }} />
          </TransparentButton>
        </FlexContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={IndebtedPeopleFormSchema}
          onSubmit={(values) => handleSubmit(values)}
          validateOnMount
        >
          {({ submitForm, values }) => (
            <FormContainer>
              <Field
                component={InputForm}
                name="name"
                type="text"
                variant="standard"
                label="Full Name"
                validate={checkRepeatedValue}
              />
              <Field
                component={InputForm}
                name="amount"
                type="number"
                variant="standard"
                label="Amount"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              <Field
                component={InputForm}
                name="amountPaid"
                type="number"
                variant="standard"
                label="Amount Paid"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              <FormControlLabel
                control={(
                  <Field
                    type="checkbox"
                    checked={values.isPaid}
                    label="Transaction paid"
                    name="isPaid"
                    component={Switch}
                  />
                )}
                label="Transaction paid"
              />
              <PrimaryButton variant="contained" size="medium" onClick={submitForm}>
                { (modifyAction) ? 'Modify' : 'Add'}
                {' '}
                Person
              </PrimaryButton>
            </FormContainer>
          )}
        </Formik>
      </Container>
    </Dialog>
  );
};

export { AddIndebtedPerson };
