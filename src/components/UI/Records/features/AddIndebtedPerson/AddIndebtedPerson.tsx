/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Typography } from '@mui/material';
import { Field, Formik } from 'formik';
import { Switch } from 'formik-mui';

import { IndebtedPeopleFormSchema } from '../../../../../validationsSchemas/records.schema';
import { FormContainer } from '../RecordTemplate/RecordTemplate.styled';
import {
  PrimaryButton, InputForm, InputAdornment,
  FormControlLabel, TransparentButton, FlexContainer,
} from '../../../../../styles';
import { IndebtedPeople } from '../../../../../globalInterface';
import { AddIndebtedPersonProps } from './interface';
import { Container } from './AddIndebtedPeople.styled';
import { CloseIcon } from '../../../Icons';
import NumericFormatCustom from '../../../../Other/NumericFormatCustom';

const AddIndebtedPerson = ({
  open, onClose, addPerson, indebtedPeople = [], indebtedPerson, modifyAction, updatePerson,
}: AddIndebtedPersonProps) => {
  const initialValues = modifyAction ? {
    name: indebtedPerson?.name ?? '',
    amount: indebtedPerson?.amount ?? '',
    amountPaid: indebtedPerson?.amountPaid ?? '',
    isPaid: indebtedPerson?.isPaid ?? false,
  } : {
    name: '',
    amount: '',
    amountPaid: '',
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
          <Typography variant="h4">
            { (modifyAction) ? 'Modify' : 'Add' }
            {' '}
            Person
          </Typography>
          <TransparentButton onClick={onClose}>
            <CloseIcon />
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
                type="string"
                variant="standard"
                label="Amount"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  inputComponent: NumericFormatCustom as any,
                }}
              />
              <Field
                component={InputForm}
                name="amountPaid"
                type="string"
                variant="standard"
                label="Amount Paid"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  inputComponent: NumericFormatCustom as any,
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
