import {
  Dialog,
} from '@mui/material';
import { Field, Formik } from 'formik';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { userAtom } from '../../../../../atoms';
import { TYPE_OF_ACCOUNTS } from '../../../../../constants';
import { ICreateAccount, CreateAccountDialogProps } from '../../interface';
import { CreateAccountSchema } from '../../../../../validationsSchemas';
import { postRequestWithBearerToken } from '../../../../../utils';
import { POST_CREATE_ACCOUNT_ROUTE } from '../../constants';
import { SelectInput } from '../../../SelectInput';
import {
  DialogTitle, InputForm, PrimaryButton, BackgroundColors, TextColors,
} from '../../../../../styles';
import { FormContainer } from '../../../../../styles/LoginModule.styled';
import { accountsAtom } from '../../../../../atoms/atoms';
import { IAccount } from '../../../../../globalInterface';
import { SystemStateEnum } from '../../../../../enums';

const initialValuesPersonalInfo: ICreateAccount = {
  title: '',
  accountType: 'Debit',
  amount: 0,
  backgroundColor: 'white',
  color: 'black',
};

const CreateAccountDialog = ({
  open,
  onClose,
  dashboardNotificationFunctions,
}: CreateAccountDialogProps) => {
  const [user] = useAtom(userAtom);
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;
  const {
    updateTitle,
    updateDescription,
    updateStatus,
    toggleShowNotification,
  } = dashboardNotificationFunctions;

  const handleSubmit = async (values: ICreateAccount) => {
    const responseCreateAccountRequest = await postRequestWithBearerToken(
      values,
      POST_CREATE_ACCOUNT_ROUTE,
      bearerToken,
    );
    // eslint-disable-next-line no-console
    console.log(responseCreateAccountRequest);

    if (responseCreateAccountRequest?.error || !responseCreateAccountRequest) {
      updateTitle('Create Account: Error');
      updateDescription('Oops! An error ocurred. Try again later.');
      updateStatus(SystemStateEnum.Error);
      onClose();
      toggleShowNotification();
      return;
    }
    // Update account state
    if (Array.isArray(accounts) && responseCreateAccountRequest?._id) {
      const newAccounts: IAccount[] = [...accounts];
      newAccounts.push(responseCreateAccountRequest as IAccount);
      setAccounts(newAccounts);
      onClose();
    }

    // Show success notification
    updateTitle(`Account ${values.title} created`);
    updateStatus(SystemStateEnum.Success);
    onClose();
    toggleShowNotification();
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
