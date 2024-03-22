import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { updateAccounts, updateSelectedAccount } from '../../../../../redux/slices/Accounts/accounts.slice';
import { ErrorParagraphValidation } from '../../../../../styles';
import { SelectInput } from '../../../SelectInput';
import { SelectAccount } from '../../../SelectInput/interface';

interface TransferAccountSelectorProps {
  setDestinationAsCredit: () => void;
  setDestinationAsNonCredit: () => void;
  updateDestinationAccountId: (id: string) => void;
  errorOriginAccount?: string;
  errorDestinationAccount?: string;
  touchedOriginAccount?: boolean;
  touchedDestinationAccount?: boolean;
}

const TransferAccountSelector = ({
  errorDestinationAccount, errorOriginAccount, touchedDestinationAccount, touchedOriginAccount,
  setDestinationAsCredit, setDestinationAsNonCredit, updateDestinationAccountId,
}: TransferAccountSelectorProps) => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const accountsOptions: SelectAccount[] = (accounts ?? []).map((account) => ({ _id: account._id, title: account.title }));
  const accountsOptionsDestination = accountsOptions.filter((account) => account._id !== selectedAccount?._id);
  let lastDestinationAccountId: string | null = null;

  const handleSelectOriginAccount = (name: string, value: string | string[]) => {
    if (name === 'originAccount' && typeof value === 'string') {
      const newSelectedAccount = (accounts ?? []).find((account) => account._id === value);
      const updatedAccounts = accounts?.map((account) => (account._id === value ? { ...account, selected: true } : { ...account, selected: false }));
      if (newSelectedAccount && selectedAccount?._id !== newSelectedAccount._id) {
        dispatch(updateSelectedAccount(newSelectedAccount));
        dispatch(updateAccounts(updatedAccounts));
      }
    }
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
      <SelectInput
        labelId="select-origin-account"
        labelName="Origin Account"
        fieldName="originAccount"
        accountsOptions={accountsOptions}
        colorOptions={[]}
        stringOptions={[]}
        processSelectDataFn={handleSelectOriginAccount}
      />
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
