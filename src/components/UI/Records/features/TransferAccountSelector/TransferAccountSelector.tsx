import { useMemo, useState } from 'react';
import { FormControl } from '@mui/material';
import { Field } from 'formik';

import { useAppSelector } from '../../../../../redux/hooks';
import { SelectAccount } from '../../../SelectInput/interface';
import { TransferAccountSelectorProps } from './TransferAccountSelector.interfaces';
import { SelectOriginAccount } from './SelectOriginAccount';
import { ErrorParagraphValidation, InputLabel, MenuItem } from '../../../../../styles';
import { SelectDestinationAccount } from './SelectDestinationAccount';

const TransferAccountSelector = ({
  errorDestinationAccount, errorOriginAccount, touchedDestinationAccount, touchedOriginAccount,
  setDestinationAsCredit, setDestinationAsNonCredit, updateDestinationAccountId, originAccountId,
}: TransferAccountSelectorProps) => {
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const accountsOptions: SelectAccount[] = useMemo(() => (accounts ?? []).map((account) => ({ _id: account._id, title: account.title })), [accounts]);
  const initialDestinationOptions = accountsOptions.filter((account) => account._id !== originAccountId);
  const [accountsOptionsDestination, setAccountsOptionsDestination] = useState<SelectAccount[]>(initialDestinationOptions);
  let lastDestinationAccountId: string | null = null;

  const selectOriginAccount = (value: string) => {
    const newDestinationOptions = accountsOptions.filter((account) => account._id !== value);
    setAccountsOptionsDestination(newDestinationOptions);
  };

  // Function to toggle the flag where the destination account is a credit account.
  const toggleDestinationCredit = (value: string) => {
    if (value !== lastDestinationAccountId) {
      lastDestinationAccountId = value;
      const destinationAccount = (accounts ?? []).find((account) => account._id === value);
      if (destinationAccount && destinationAccount.accountType === 'Credit') {
        setDestinationAsCredit();
        updateDestinationAccountId(value);
      } else if (destinationAccount && destinationAccount.accountType !== 'Credit') {
        setDestinationAsNonCredit();
      }
    }
  };

  return (
    <>
      <FormControl variant="standard">
        <InputLabel id="select-origin-account">Origin Account</InputLabel>
        <Field name="originAccount" selectOriginAccount={selectOriginAccount} component={SelectOriginAccount}>
          {
            (accountsOptions ?? []).map((option) => (
              <MenuItem key={`originAccount-${option._id}`} value={option._id}>{option.title}</MenuItem>
            ))
          }
        </Field>
      </FormControl>
      { (touchedOriginAccount && errorOriginAccount) && (
        <ErrorParagraphValidation variant="subText">{errorOriginAccount}</ErrorParagraphValidation>
      ) }
      <FormControl variant="standard">
        <InputLabel id="select-destination-account">Destination Account</InputLabel>
        <Field name="destinationAccount" toggleDestinationCredit={toggleDestinationCredit} component={SelectDestinationAccount}>
          {
            (accountsOptionsDestination ?? []).map((option) => (
              <MenuItem key={`destinationAccount-${option._id}`} value={option._id}>{option.title}</MenuItem>
            ))
          }
        </Field>
      </FormControl>
      { (touchedDestinationAccount && errorDestinationAccount) && (
        <ErrorParagraphValidation variant="subText">{errorDestinationAccount}</ErrorParagraphValidation>
      ) }
    </>
  );
};

export { TransferAccountSelector };
