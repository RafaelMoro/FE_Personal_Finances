import { useAppSelector } from '../../../../../redux/hooks';
import { ErrorParagraphValidation } from '../../../../../styles';
import { SelectInput } from '../../../SelectInput';

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
  const accountsOptions = (accounts ?? []).map((account) => account.title);
  const accountsOptionsDestination = accountsOptions.filter((account) => account !== selectedAccount?.title);
  return (
    <>
      <SelectInput
        labelId="select-origin-account"
        labelName="Origin Account"
        fieldName="originAccount"
        stringOptions={accountsOptions}
        colorOptions={[]}
        processSelectDataFn={() => {}}
      />
      { (touchedOriginAccount && errorOriginAccount) && (
        <ErrorParagraphValidation variant="subText">{errorOriginAccount}</ErrorParagraphValidation>
      ) }
      <SelectInput
        labelId="select-destination-account"
        labelName="Destination Account"
        fieldName="destinationAccount"
        stringOptions={accountsOptionsDestination}
        colorOptions={[]}
        processSelectDataFn={() => {}}
      />
      { (touchedDestinationAccount && errorDestinationAccount) && (
        <ErrorParagraphValidation variant="subText">{errorDestinationAccount}</ErrorParagraphValidation>
      ) }
    </>
  );
};

export { TransferAccountSelector };
