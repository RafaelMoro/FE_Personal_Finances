/* eslint-disable no-console */
import {
  Dialog, IconButton,
} from '@mui/material';
import { Field, Formik } from 'formik';
import { useAtom } from 'jotai';
import { AxiosError, AxiosRequestHeaders } from 'axios';

import { CreateAccount, AccountDialogProps } from '../../interface';
import { CreateAccountSchema } from '../../../../../validationsSchemas';
import { HttpRequestWithBearerToken } from '../../../../../utils/HttpRequestWithBearerToken';
import { POST_PUT_ACCOUNT_ROUTE } from '../../constants';
import { SelectInput } from '../../../SelectInput';
import {
  DialogTitle, InputForm, PrimaryButton, BackgroundColors, TextColors, FlexContainer,
} from '../../../../../styles';
import { AccountDialogFormContainer } from '../../Account.styled';
import { accountsAtom, selectedAccountAtom, accountsUIAtom } from '../../../../../atoms/atoms';
import { Account, TYPE_OF_ACCOUNTS } from '../../../../../globalInterface';
import { SystemStateEnum } from '../../../../../enums';
import { formatAccounts } from '../../../../../utils';
import { useNotification } from '../../../../../hooks/useNotification';
import { CloseIcon } from '../../../Icons';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { CreateAccountThunkProps } from '../../../../../redux/slices/Accounts/interface';
import { createAccount as createAccountThunkFn } from '../../../../../redux/slices/Accounts/createAccount';
import { ERROR_MESSAGE_GENERAL } from '../../../../../constants';

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
  const dispatch = useAppDispatch();
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as AxiosRequestHeaders;

  // Copying constant because it is readyonly
  const typeAccounts = [...TYPE_OF_ACCOUNTS];
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [, setAccountsUI] = useAtom(accountsUIAtom);
  const [, setSelectedAccount] = useAtom(selectedAccountAtom);
  const { updateGlobalNotification } = useNotification();
  const titleModal = accountAction === 'Create' ? 'Create Account:' : 'Modify Account:';
  const buttonModalText = accountAction === 'Create' ? 'Create Account' : 'Modify Account';
  const initialValues = accountAction === 'Create' ? initialValuesCreateAccount : account as Account;

  const createAccount = async (values: CreateAccount) => {
    try {
      const createAccountThunkProps: CreateAccountThunkProps = { values, bearerToken };
      await dispatch(createAccountThunkFn(createAccountThunkProps)).unwrap();

      // Show success notification
      updateGlobalNotification({
        newTitle: `Account ${values.title} created`,
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });
      onClose();
    } catch (err) {
      const errorCatched = err as AxiosError;
      console.group();
      console.error('Error on creating account');
      console.error(errorCatched);
      console.groupEnd();

      updateGlobalNotification({
        newTitle: 'Create Account: Error',
        newDescription: ERROR_MESSAGE_GENERAL,
        newStatus: SystemStateEnum.Error,
      });
      onClose();
    }
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
        <FlexContainer justifyContent="end" padding="1rem">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </FlexContainer>
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
