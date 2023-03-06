import {
  Dialog,
} from '@mui/material';
import { Field, Formik } from 'formik';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { userAtom } from '../../../../../atoms';
import { TYPE_OF_ACCOUNTS } from '../../../../../constants';
import { CreateAccount, CreateAccountDialogProps } from '../../interface';
import { CreateAccountSchema } from '../../../../../validationsSchemas';
import { postRequestWithBearerToken } from '../../../../../utils';
import { POST_CREATE_ACCOUNT_ROUTE } from '../../constants';
import { SelectInput } from '../../../SelectInput';
import {
  DialogTitle, InputForm, PrimaryButton, BackgroundColors, TextColors,
} from '../../../../../styles';
import { AccountDialogFormContainer } from '../../Account.styled';
import { accountsAtom } from '../../../../../atoms/atoms';
import { Account } from '../../../../../globalInterface';
import { SystemStateEnum } from '../../../../../enums';

const initialValuesCreateAccount: CreateAccount = {
  title: '',
  accountType: 'Debit',
  amount: 0,
  backgroundColor: 'white',
  color: 'black',
};

const AccountDialog = ({
  open,
  onClose,
  dashboardNotificationFunctions,
  accountAction,
  account,
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
  const titleModal = accountAction === 'Create' ? 'Create Account:' : 'Modify Account:';
  const buttonModalText = accountAction === 'Create' ? 'Create Account' : 'Modify Account';
  const initialValues = accountAction === 'Create' ? initialValuesCreateAccount : account as Account;

  const createAccount = async (values: CreateAccount) => {
    const responseCreateAccountRequest = await postRequestWithBearerToken(
      values,
      POST_CREATE_ACCOUNT_ROUTE,
      bearerToken,
    );

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
      const newAccounts: Account[] = [...accounts];
      newAccounts.push(responseCreateAccountRequest as Account);
      setAccounts(newAccounts);
      onClose();
    }

    // Show success notification
    updateTitle(`Account ${values.title} created`);
    updateStatus(SystemStateEnum.Success);
    onClose();
    toggleShowNotification();
  };

  const modifyAccount = (values: CreateAccount) => {
    // Modifica cuenta acciones
  };

  const handleSubmit = accountAction === 'Create' ? createAccount : modifyAccount;

  return (
    <Dialog onClose={onClose} open={open}>
      <>
        <DialogTitle>{ titleModal }</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={CreateAccountSchema}
          onSubmit={(values) => handleSubmit(values)}
          validateOnMount
        >
          {({ submitForm }) => (
            <AccountDialogFormContainer>
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
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">{ buttonModalText }</PrimaryButton>
            </AccountDialogFormContainer>
          )}
        </Formik>
      </>
    </Dialog>
  );
};

export { AccountDialog };
