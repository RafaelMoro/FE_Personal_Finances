import {
  Dialog,
} from '@mui/material';
import { Field, Formik } from 'formik';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { userAtom } from '../../../../../atoms';
import { CreateAccount, AccountDialogProps } from '../../interface';
import { CreateAccountSchema } from '../../../../../validationsSchemas';
import { HttpRequestWithBearerToken } from '../../../../../utils/HttpRequestWithBearerToken';
import { POST_PUT_ACCOUNT_ROUTE } from '../../constants';
import { SelectInput } from '../../../SelectInput';
import {
  DialogTitle, InputForm, PrimaryButton, BackgroundColors, TextColors,
} from '../../../../../styles';
import { AccountDialogFormContainer } from '../../Account.styled';
import { accountsAtom, selectedAccountAtom, accountsUIAtom } from '../../../../../atoms/atoms';
import { Account, TYPE_OF_ACCOUNTS } from '../../../../../globalInterface';
import { SystemStateEnum } from '../../../../../enums';
import { formatAccounts } from '../../../../../utils';
import { useNotification } from '../../../../../hooks/useNotification';

const initialValuesCreateAccount: CreateAccount = {
  title: '',
  accountType: 'Debit',
  amount: 0,
  backgroundColor: 'White',
  color: 'Black',
};

const AccountDialog = ({
  open,
  onClose,
  accountAction,
  account,
}: AccountDialogProps) => {
  // Copying constant because it is readyonly
  const typeAccounts = [...TYPE_OF_ACCOUNTS];
  const [user] = useAtom(userAtom);
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [, setAccountsUI] = useAtom(accountsUIAtom);
  const [, setSelectedAccount] = useAtom(selectedAccountAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;
  const { updateGlobalNotification } = useNotification();
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
      updateGlobalNotification({
        newTitle: 'Create Account: Error',
        newDescription: 'Oops! An error ocurred. Try again later.',
        newStatus: SystemStateEnum.Error,
      });
      onClose();
      return;
    }

    // Update account state
    if (Array.isArray(accounts) && responseCreateAccountRequest?._id) {
      // Update Account atom
      const newAccounts: Account[] = [...accounts];
      newAccounts.push(responseCreateAccountRequest as Account);
      setAccounts(newAccounts);

      // Update AccountUI atom
      const newAccountsUI = formatAccounts({ accounts: newAccounts });
      setAccountsUI(newAccountsUI);

      // Update SelectedAccount atom
      setSelectedAccount(newAccountsUI[0]);
    }

    // Show success notification
    updateGlobalNotification({
      newTitle: `Account ${values.title} created`,
      newDescription: '',
      newStatus: SystemStateEnum.Success,
    });
    onClose();
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
      updateGlobalNotification({
        newTitle: 'Update Account: Error',
        newDescription: 'Oops! An error ocurred. Try again later.',
        newStatus: SystemStateEnum.Error,
      });
      onClose();
      return;
    }

    // Modify accounts, accountsUI and selectedAccount atom
    if (Array.isArray(accounts) && responsePutAccountRequest?._id) {
      const filteredAccounts = accounts
        .filter((filteredAccount) => filteredAccount._id !== accountId);
      filteredAccounts.push(values);
      setAccounts(filteredAccounts);

      const newAccountsUI = formatAccounts({
        accounts: filteredAccounts, selectedAccountId: accountId,
      });
      // eslint-disable-next-line max-len
      const newSelectedAccount = newAccountsUI.find((accountUI) => accountUI.selected === true) ?? newAccountsUI[0];
      setSelectedAccount(newSelectedAccount);
      setAccountsUI(newAccountsUI);
    }

    // Show success notification
    updateGlobalNotification({
      newTitle: `Account ${values.title} updated`,
      newDescription: '',
      newStatus: SystemStateEnum.Success,
    });
    onClose();
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
              <SelectInput
                labelId="select-account-type"
                labelName="Type of Account"
                fieldName="accountType"
                stringOptions={typeAccounts}
                colorOptions={[]}
              />
              <SelectInput
                labelId="select-background-color"
                labelName="Background Color:"
                fieldName="backgroundColor"
                stringOptions={[]}
                colorOptions={BackgroundColors}
                selectInputColors
              />
              <SelectInput
                selectInputColors
                labelId="select-color"
                labelName="Text Color:"
                fieldName="color"
                stringOptions={[]}
                colorOptions={TextColors}
              />
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">{ buttonModalText }</PrimaryButton>
            </AccountDialogFormContainer>
          )}
        </Formik>
      </>
    </Dialog>
  );
};

export { AccountDialog };
