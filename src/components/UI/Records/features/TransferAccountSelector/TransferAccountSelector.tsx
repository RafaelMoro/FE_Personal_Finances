import { useAppSelector } from '../../../../../redux/hooks';
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
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const accountsOptions: SelectAccount[] = (accounts ?? []).map((account) => ({ _id: account._id, title: account.title }));
  const accountsOptionsDestination = accountsOptions.filter((account) => account._id !== selectedAccount?._id);

  const handleSelectOriginAccount = () => {
    // something
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
        processSelectDataFn={() => {}}
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
        processSelectDataFn={() => {}}
      />
      { (touchedDestinationAccount && errorDestinationAccount) && (
        <ErrorParagraphValidation variant="subText">{errorDestinationAccount}</ErrorParagraphValidation>
      ) }
    </>
  );
};

export { TransferAccountSelector };
