import { useMemo, useState } from 'react';
import { FormControl } from '@mui/material';
import { Field } from 'formik';
import { useAppSelector } from '../../../../../redux/hooks';
import { ErrorParagraphValidation, InputLabel, MenuItem } from '../../../../../styles';
import { SelectInput } from '../../../SelectInput';
import { SelectAccount } from '../../../SelectInput/interface';
import { SelectOriginAccount } from '../../../SelectInput/SelectFormik';

interface TransferAccountSelectorProps {
  setDestinationAsCredit: () => void;
  setDestinationAsNonCredit: () => void;
  updateDestinationAccountId: (id: string) => void;
  errorOriginAccount?: string;
  errorDestinationAccount?: string;
  touchedOriginAccount?: boolean;
  touchedDestinationAccount?: boolean;
  originAccountId: string;
}

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
  const toggleDestinationCredit = (name: string, value: string | string[]) => {
    if (name === 'destinationAccount' && typeof value === 'string' && value !== '') {
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
    }
  };

  return (
    <>
      <FormControl variant="standard">
        <InputLabel id="select-origin-account">Destination Account</InputLabel>
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
      <SelectInput
        labelId="select-destination-account"
        labelName="Destination Account"
        fieldName="destinationAccount"
        accountsOptions={accountsOptionsDestination}
        colorOptions={[]}
        stringOptions={[]}
        processSelectDataFn={toggleDestinationCredit}
      />
      { (touchedDestinationAccount && errorDestinationAccount) && (
        <ErrorParagraphValidation variant="subText">{errorDestinationAccount}</ErrorParagraphValidation>
      ) }
    </>
  );
};

export { TransferAccountSelector };
