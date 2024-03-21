import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { updateAccounts, updateSelectedAccount } from '../../../../../redux/slices/Accounts/accounts.slice';
import { ErrorParagraphValidation } from '../../../../../styles';
import { SelectInput } from '../../../SelectInput';
import { SelectAccount } from '../../../SelectInput/interface';

interface TransferAccountSelectorProps {
  errorOriginAccount?: string;
  errorDestinationAccount?: string;
  touchedOriginAccount?: boolean;
  touchedDestinationAccount?: boolean;
}

const TransferAccountSelector = ({
  errorDestinationAccount, errorOriginAccount, touchedDestinationAccount, touchedOriginAccount,
}: TransferAccountSelectorProps) => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const accountsOptions: SelectAccount[] = (accounts ?? []).map((account) => ({ _id: account._id, title: account.title }));
  const accountsOptionsDestination = accountsOptions.filter((account) => account._id !== selectedAccount?._id);

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
      />
      { (touchedDestinationAccount && errorDestinationAccount) && (
        <ErrorParagraphValidation variant="subText">{errorDestinationAccount}</ErrorParagraphValidation>
      ) }
    </>
  );
};

export { TransferAccountSelector };
