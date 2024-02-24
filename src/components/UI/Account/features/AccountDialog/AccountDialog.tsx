/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import {
  Dialog, IconButton,
} from '@mui/material';
import { Field, Formik } from 'formik';

import { ERROR_MESSAGE_GENERAL } from '../../../../../constants';
import { TYPE_OF_ACCOUNTS } from '../../../../../globalInterface';
import { SystemStateEnum } from '../../../../../enums';
import { useAppSelector } from '../../../../../redux/hooks';
import { CreateAccountMutationProps, ModifyAccountMutationProps } from '../../../../../redux/slices/Accounts/interface';
import { useNotification } from '../../../../../hooks/useNotification';
import { CreateAccountSchema } from '../../../../../validationsSchemas';
import {
  CreateAccount, AccountDialogProps, AccountUI, ModifyAccountValues, ModifyAccountInitialValues, CreateAccountInitialValues,
} from '../../interface';
import { SelectInput } from '../../../SelectInput';
import { CloseIcon } from '../../../Icons';
import {
  DialogTitle, InputForm, PrimaryButton, AllBackgroundColors, FlexContainer, InputAdornment,
} from '../../../../../styles';
import { AccountDialogFormContainer } from '../../Account.styled';
import { LoadingSpinner } from '../../../LoadingSpinner';
import NumericFormatCustom from '../../../../Other/NumericFormatCustom';
import { useCreateAccountMutation, useModifyAccountMutation } from '../../../../../redux/slices/Accounts/actions';

const initialValuesCreateAccount: CreateAccountInitialValues = {
  title: '',
  accountType: 'Debit',
  amount: '',
  backgroundColor: 'Dark Orange',
};
const startAdornment = <InputAdornment position="start">$</InputAdornment>;

const AccountDialog = ({
  open,
  onClose,
  accountAction,
  account,
}: AccountDialogProps) => {
  const [createAccountMutation, { isLoading: isLoadingCreateAccount }] = useCreateAccountMutation();
  const [modifyAccountMutation, { isLoading: isLoadingModifyAccount }] = useModifyAccountMutation();
  const { updateGlobalNotification } = useNotification();
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;

  // Copying constant because it is readyonly
  const typeAccounts = [...TYPE_OF_ACCOUNTS];
  const titleModal = accountAction === 'Create' ? 'Create Account:' : 'Modify Account:';
  const buttonModalText = accountAction === 'Create' ? 'Create Account' : 'Modify Account';

  // Transforming amount from account to string;
  const accountToBeModified = useMemo(() => {
    const amount = account?.amount ?? 0;
    const amountString = String(amount);
    const newAccount: ModifyAccountInitialValues = { ...account as AccountUI, amount: amountString };
    return newAccount;
  }, [account]);

  const initialValues = accountAction === 'Create' ? initialValuesCreateAccount : accountToBeModified;

  const createAccount = async (values: CreateAccountInitialValues) => {
    try {
      // Transform amount to number as it comes as string.
      const amountNumber = Number(values.amount);
      const createAccountValues: CreateAccount = { ...values, amount: amountNumber };
      const createAccountMutationProps: CreateAccountMutationProps = { values: createAccountValues, bearerToken };
      await createAccountMutation(createAccountMutationProps).unwrap();

      // Show success notification
      updateGlobalNotification({
        newTitle: `Account ${values.title} created`,
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });
      onClose();
    } catch (err) {
      updateGlobalNotification({
        newTitle: 'Create Account: Error',
        newDescription: ERROR_MESSAGE_GENERAL,
        newStatus: SystemStateEnum.Error,
      });
      onClose();
    }
  };

  const modifyAccount = async (values: any) => {
    try {
      // Excluding version, accountUI props and changing _id for accountId
      const {
        __v: version, sub, selected, backgroundColorUI, colorUI, amountFormatted, amount, _id: accountId, ...rest
      } = values;
      const amountNumber = Number(amount ?? '0');
      const accountModifiedValues: ModifyAccountValues = { ...rest, accountId, amount: amountNumber };
      const modifyAccountMutationProps: ModifyAccountMutationProps = { values: accountModifiedValues, bearerToken };
      await modifyAccountMutation(modifyAccountMutationProps);

      // Show success notification
      updateGlobalNotification({
        newTitle: `Account ${accountModifiedValues.title} updated`,
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });
      onClose();
    } catch (err) {
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
        <FlexContainer justifyContent="spaceBetween" alignItems="center" padding="1rem">
          <DialogTitle>{ titleModal }</DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </FlexContainer>
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
                type="text"
                variant="standard"
                label="Account Amount"
                InputProps={{
                  startAdornment,
                  inputComponent: NumericFormatCustom as any,
                }}
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
                labelName="Color:"
                fieldName="backgroundColor"
                stringOptions={[]}
                colorOptions={AllBackgroundColors}
                selectInputColors
              />
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">
                { (isLoadingCreateAccount || isLoadingModifyAccount) ? (<LoadingSpinner />) : buttonModalText }
              </PrimaryButton>
            </AccountDialogFormContainer>
          )}
        </Formik>
      </>
    </Dialog>
  );
};

export { AccountDialog };
