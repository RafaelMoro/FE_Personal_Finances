import { Dialog } from '@mui/material';
import { Field, Formik } from 'formik';
import { Switch } from 'formik-mui';

import { IndebtedPeopleFormSchema } from '../../../../../validationsSchemas/records.schema';
import { FormContainer } from '../RecordTemplate/RecordTemplate.styled';
import {
  ParagraphTitle, PrimaryButton, InputForm, InputAdornment,
  FormControlLabel,
} from '../../../../../styles';
import { IndebtedPeople } from '../../../../../globalInterface';

interface AddIndebtedPersonProps {
  open: boolean;
  onClose: () => void;
  updateData: (indebtedPeople: IndebtedPeople) => void;
}

const AddIndebtedPerson = ({ open, onClose, updateData }: AddIndebtedPersonProps) => {
  const initialValues = {
    name: '',
    amount: 0,
    amountPaid: 0,
    isPaid: false,
  };

  const handleSubmit = (values: IndebtedPeople) => {
    updateData(values);
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <ParagraphTitle>Add Person</ParagraphTitle>
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
            <PrimaryButton variant="contained" size="medium" onClick={submitForm}>Add Person</PrimaryButton>
          </FormContainer>
        )}
      </Formik>
    </Dialog>
  );
};

export { AddIndebtedPerson };
