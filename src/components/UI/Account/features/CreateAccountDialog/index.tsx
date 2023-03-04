import {
  Dialog, MenuItem, FormControl,
} from '@mui/material';
import { Field, Formik } from 'formik';

import { AccountType, ICreateAccount } from '../../interface';
import { CreateAccountSchema } from '../../../../../validationsSchemas';
import { SelectFormik } from '../../../SelectFormik';
import {
  DialogTitleStyled, InputForm, PrimaryButton, InputLabel,
} from '../../../../../styles';
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
  const accountsType: AccountType[] = ['Credit', 'Debit', 'Food Voucher', 'Restaurant Voucher', 'Savings'];

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
              <FormControl>
                <InputLabel id="demo-simple-select-label">Account Type:</InputLabel>
                <Field name="accountType" component={SelectFormik}>
                  { accountsType.map((account) => (
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
