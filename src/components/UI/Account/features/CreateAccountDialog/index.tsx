import {
  Dialog, FormControl,
} from '@mui/material';
import { Field, Formik } from 'formik';

import { TYPE_OF_ACCOUNTS } from '../../../../../constants';
import { ICreateAccount, CreateAccountDialogProps } from '../../interface';
import { CreateAccountSchema } from '../../../../../validationsSchemas';
import { SelectFormik } from '../../../SelectFormik';
import {
  DialogTitle, InputForm, PrimaryButton, InputLabel, MenuItem,
} from '../../../../../styles';
import { FormContainer } from '../../../../../styles/LoginModule.styled';

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
        <DialogTitle> Create Account:</DialogTitle>
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
              <FormControl variant="standard">
                <InputLabel id="select-account-type">Account Type:</InputLabel>
                <Field name="accountType" component={SelectFormik}>
                  { TYPE_OF_ACCOUNTS.map((account) => (
                    <MenuItem key={`account-${account}`} value={account}>{account}</MenuItem>
                  )) }
                </Field>
              </FormControl>
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">Create Account</PrimaryButton>
            </FormContainer>
          )}
        </Formik>
      </>
    </Dialog>
  );
};

export { CreateAccountDialog };
