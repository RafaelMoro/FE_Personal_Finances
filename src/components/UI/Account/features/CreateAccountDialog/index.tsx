import {
  Dialog,
} from '@mui/material';
import { Field, Formik } from 'formik';

import { ICreateAccount } from '../../interface';
import { CreateAccountSchema } from '../../../../../validationsSchemas';
import { DialogTitleStyled, InputForm, PrimaryButton } from '../../../../../styles';
import { FormContainer } from '../../../../../styles/LoginModule.styled';

interface CreateAccountDialogProps {
  open: boolean;
  onClose: () => void;
}

const initialValuesPersonalInfo: ICreateAccount = {
  title: '',
  accountType: 'Debit',
  amount: 0,
  backgroundColor: 'white',
  color: 'black',
};

const CreateAccountDialog = ({ open, onClose }: CreateAccountDialogProps) => {
  const handleSubmit = (values: ICreateAccount) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };
  return (
    <Dialog onClose={onClose} open={open}>
      <>
        <DialogTitleStyled> Create Account:</DialogTitleStyled>
        <Formik
          initialValues={initialValuesPersonalInfo}
          validationSchema={CreateAccountSchema}
          onSubmit={(values) => handleSubmit(values)}
          validateOnMount
        >
          {({ submitForm }) => (
            <FormContainer>
              <Field
                component={InputForm}
                name="title"
                type="text"
                variant="standard"
                label="Account Title"
              />
              <Field
                component={InputForm}
                name="amount"
                type="number"
                variant="standard"
                label="Account Amount"
              />
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">Create Account</PrimaryButton>
            </FormContainer>
          )}
        </Formik>
      </>
    </Dialog>
  );
};

export { CreateAccountDialog };
