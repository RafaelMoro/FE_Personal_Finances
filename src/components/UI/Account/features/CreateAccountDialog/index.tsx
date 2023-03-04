import {
  Dialog,
} from '@mui/material';
import { Field, Formik } from 'formik';

import { TYPE_OF_ACCOUNTS } from '../../../../../constants';
import { ICreateAccount, CreateAccountDialogProps } from '../../interface';
import { CreateAccountSchema } from '../../../../../validationsSchemas';
import { SelectInput } from '../../../SelectInput';
import {
  DialogTitle, InputForm, PrimaryButton, BackgroundColors, TextColors,
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
              <SelectInput labelId="select-account-type" labelName="Type of Account" fieldName="accountType" options={TYPE_OF_ACCOUNTS} />
              <SelectInput labelId="select-background-color" labelName="Background Color:" fieldName="backgroundColor" options={BackgroundColors} />
              <SelectInput labelId="select-color" labelName="Color:" fieldName="color" options={TextColors} />
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">Create Account</PrimaryButton>
            </FormContainer>
          )}
        </Formik>
      </>
    </Dialog>
  );
};

export { CreateAccountDialog };
