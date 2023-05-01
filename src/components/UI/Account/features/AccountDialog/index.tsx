import {
  Dialog,
} from '@mui/material';
import { Field, Formik } from 'formik';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { userAtom } from '../../../../../atoms';
import { TYPE_OF_ACCOUNTS } from '../../../../../constants';
import { AccountUI, CreateAccount, AccountDialogProps } from '../../interface';
import { CreateAccountSchema } from '../../../../../validationsSchemas';
import { HttpRequestWithBearerToken } from '../../../../../utils/HttpRequestWithBearerToken';
import { POST_PUT_ACCOUNT_ROUTE } from '../../constants';
import { SelectInput } from '../../../SelectInput';
import {
  DialogTitle, InputForm, PrimaryButton, BackgroundColors, TextColors,
} from '../../../../../styles';
import { AccountDialogFormContainer } from '../../Account.styled';
import { accountsAtom, selectedAccountAtom, accountsUIAtom } from '../../../../../atoms/atoms';
import { Account } from '../../../../../globalInterface';
import { SystemStateEnum } from '../../../../../enums';
import { formatNumberToCurrency } from '../../../../../utils';

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
}: AccountDialogProps) => {
  const [user] = useAtom(userAtom);
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [, setAccountsUI] = useAtom(accountsUIAtom);
  const [, setSelectedAccount] = useAtom(selectedAccountAtom);
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
    const responseCreateAccountRequest = await HttpRequestWithBearerToken(
      values,
      POST_PUT_ACCOUNT_ROUTE,
      'post',
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
    }

    // Show success notification
    updateTitle(`Account ${values.title} created`);
    updateStatus(SystemStateEnum.Success);
    onClose();
    toggleShowNotification();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modifyAccount = async (values: any) => {
    const {
      sub, __v: version, _id: accountId, ...rest
    } = values;
    const valuesToSubmit = { ...rest, accountId };

    const responsePutAccountRequest = await HttpRequestWithBearerToken(
      valuesToSubmit,
      POST_PUT_ACCOUNT_ROUTE,
      'put',
      bearerToken,
    );

    if (responsePutAccountRequest?.error || !responsePutAccountRequest) {
      updateTitle('Update Account: Error');
      updateDescription('Oops! An error ocurred. Try again later.');
      updateStatus(SystemStateEnum.Error);
      onClose();
      toggleShowNotification();
      return;
    }

    // Modify accounts, accountsUI and selectedAccount atom
    if (Array.isArray(accounts) && responsePutAccountRequest?._id) {
      const filteredAccounts = accounts
        .filter((filteredAccount) => filteredAccount._id !== accountId);
      filteredAccounts.push(values);
      setAccounts(filteredAccounts);

      const newAccountsUI = filteredAccounts.map((accountUIMapped) => {
        if (accountUIMapped._id === accountId) {
          const newSelectedAccount: AccountUI = {
            ...accountUIMapped, amount: formatNumberToCurrency(values.amount), selected: true,
          };
          setSelectedAccount(newSelectedAccount);
          return newSelectedAccount;
        }
        return {
          ...accountUIMapped,
          amount: formatNumberToCurrency(accountUIMapped.amount),
          selected: false,
        };
      });
      setAccountsUI(newAccountsUI);
    }

    // Show success notification
    updateTitle(`Account ${values.title} updated`);
    updateStatus(SystemStateEnum.Success);
    onClose();
    toggleShowNotification();
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
              <SelectInput
                labelId="select-background-color"
                labelName="Background Color:"
                fieldName="backgroundColor"
                options={BackgroundColors}
                selectInputColors
              />
              <SelectInput selectInputColors labelId="select-color" labelName="Text Color:" fieldName="color" options={TextColors} />
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">{ buttonModalText }</PrimaryButton>
            </AccountDialogFormContainer>
          )}
        </Formik>
      </>
    </Dialog>
  );
};

export { AccountDialog };
