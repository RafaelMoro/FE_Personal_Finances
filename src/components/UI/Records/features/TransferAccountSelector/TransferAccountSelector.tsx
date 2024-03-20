import { useAppSelector } from '../../../../../redux/hooks';
import { SelectInput } from '../../../SelectInput';

const TransferAccountSelector = () => {
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const accountsOptions = (accounts ?? []).map((account) => account.title);
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
      <SelectInput
        labelId="select-destiny-account"
        labelName="Destiny Account"
        fieldName="destinationAccount"
        stringOptions={accountsOptions}
        colorOptions={[]}
        processSelectDataFn={() => {}}
      />
    </>
  );
};

export { TransferAccountSelector };
