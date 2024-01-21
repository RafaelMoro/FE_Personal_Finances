/* eslint-disable no-console */
import {
  Dialog, IconButton,
} from '@mui/material';
import { Field, Formik } from 'formik';
import { AxiosError, AxiosRequestHeaders } from 'axios';

import { ERROR_MESSAGE_GENERAL } from '../../../../../constants';
import { TYPE_OF_ACCOUNTS } from '../../../../../globalInterface';
import { SystemStateEnum } from '../../../../../enums';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { CreateAccountThunkProps, ModifyAccountThunkProps } from '../../../../../redux/slices/Accounts/interface';
import { createAccountThunkFn, modifyAccountThunkFn } from '../../../../../redux/slices/Accounts/actions';
import { useNotification } from '../../../../../hooks/useNotification';
import { CreateAccountSchema } from '../../../../../validationsSchemas';
import {
  CreateAccount, AccountDialogProps, AccountUI, ModifyAccountValues,
} from '../../interface';
import { SelectInput } from '../../../SelectInput';
import { CloseIcon } from '../../../Icons';
import {
  DialogTitle, InputForm, PrimaryButton, AllBackgroundColors, AllTextColors, FlexContainer,
} from '../../../../../styles';
import { AccountDialogFormContainer } from '../../Account.styled';
import { resetAllRecords } from '../../../../../redux/slices/Records/records.slice';

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
  const { updateGlobalNotification } = useNotification();
  const titleModal = accountAction === 'Create' ? 'Create Account:' : 'Modify Account:';
  const buttonModalText = accountAction === 'Create' ? 'Create Account' : 'Modify Account';
  const initialValues = accountAction === 'Create' ? initialValuesCreateAccount : account as AccountUI;

  const createAccount = async (values: CreateAccount) => {
    try {
      const createAccountThunkProps: CreateAccountThunkProps = { values, bearerToken };
      await dispatch(createAccountThunkFn(createAccountThunkProps)).unwrap();

      dispatch(resetAllRecords());

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
    try {
      // Excluding version, accountUI props and changing _id for accountId
      const {
        __v: version, sub, selected, backgroundColorUI, colorUI, amountFormatted, _id: accountId, ...rest
      } = values;
      const accountModifiedValues: ModifyAccountValues = { ...rest, accountId };
      const modifyAccountThunkProps: ModifyAccountThunkProps = { values: accountModifiedValues, bearerToken };
      await dispatch(modifyAccountThunkFn(modifyAccountThunkProps)).unwrap();

      // Show success notification
      updateGlobalNotification({
        newTitle: `Account ${accountModifiedValues.title} updated`,
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });
      onClose();
    } catch (err) {
      const errorCatched = err as AxiosError;
      console.group();
      console.error('Error on modifying account');
      console.error(errorCatched);
      console.groupEnd();

      updateGlobalNotification({
        newTitle: 'Modify Account: Error',
        newDescription: ERROR_MESSAGE_GENERAL,
        newStatus: SystemStateEnum.Error,
      });
      onClose();
    }
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
                colorOptions={AllBackgroundColors}
                selectInputColors
              />
              <SelectInput
                selectInputColors
                labelId="select-color"
                labelName="Text Color:"
                fieldName="color"
                stringOptions={[]}
                colorOptions={AllTextColors}
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