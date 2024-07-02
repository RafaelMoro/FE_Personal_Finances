/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Typography } from '@mui/material';
import { Field, Formik } from 'formik';
import { Switch } from 'formik-mui';

import { useRef } from 'react';
import { IndebtedPeopleFormSchema } from '../../../../../validationsSchemas/records.schema';
import { FormContainer } from '../RecordTemplate/RecordTemplate.styled';
import {
  PrimaryButton, InputForm,
  FormControlLabel, TransparentButton, FlexContainer,
} from '../../../../../styles';
import { IndebtedPeople } from '../../../../../globalInterface';
import { AddIndebtedPersonProps } from './AddIndebtedPerson.interface';
import { Container } from './AddIndebtedPeople.styled';
import { AppIcon } from '../../../Icons';
import { CurrencyField } from '../../../../Other';
import { useCurrencyField } from '../../../../Other/CurrencyField/useCurrencyField';

const AddIndebtedPerson = ({
  open, onClose, addPerson, indebtedPeople = [], indebtedPerson, modifyAction, updatePerson,
}: AddIndebtedPersonProps) => {
  const { updateAmount, initialAmount } = useCurrencyField();
  const initialAmountPaid = useRef('');
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

  const updateAmountPaid = (amount: string) => {
    initialAmountPaid.current = amount;
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
      updatePerson({ ...values, amount: initialAmount.current, amountPaid: initialAmountPaid.current });
      onClose();
      return;
    }
    addPerson({ ...values, amount: initialAmount.current, amountPaid: initialAmountPaid.current });
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
            <AppIcon icon="Close" />
          </TransparentButton>
        </FlexContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={IndebtedPeopleFormSchema}
          onSubmit={(values) => handleSubmit(values)}
          validateOnMount
        >
          {({ submitForm, values, setFieldValue }) => (
            <FormContainer>
              <Field
                component={InputForm}
                name="name"
                type="text"
                variant="standard"
                label="Full Name"
                validate={checkRepeatedValue}
              />
              <CurrencyField setFieldValue={setFieldValue} updateAmount={updateAmount} amount={initialAmount.current} />
              <CurrencyField
                setFieldValue={setFieldValue}
                updateAmount={updateAmountPaid}
                amount={initialAmountPaid.current}
                fieldName="amountPaid"
                labelName="Amount Paid"
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
