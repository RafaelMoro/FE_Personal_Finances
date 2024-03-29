import { useAppSelector } from '../../../../../redux/hooks';
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
  originAccountId: string;
}

const TransferAccountSelector = ({
  errorDestinationAccount, errorOriginAccount, touchedDestinationAccount, touchedOriginAccount,
  setDestinationAsCredit, setDestinationAsNonCredit, updateDestinationAccountId, originAccountId,
}: TransferAccountSelectorProps) => {
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const accountsOptions: SelectAccount[] = (accounts ?? []).map((account) => ({ _id: account._id, title: account.title }));
  // @TODO: Volver accounts option destination en un estado para que se actualice en base de la cuenta de origen.
  const accountsOptionsDestination = accountsOptions.filter((account) => account._id !== originAccountId);
  let lastDestinationAccountId: string | null = null;

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
