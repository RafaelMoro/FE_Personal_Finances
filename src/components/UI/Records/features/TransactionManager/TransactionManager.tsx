import { useState } from 'react';
import { TypeOfRecord } from '../RecordTemplate/interface';
import { GoBackButton, RecordTemplateMain, ToggleButtonGroup } from '../RecordTemplate/RecordTemplate.styled';
import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { AppIcon } from '../../../Icons';
import { ToggleButton } from '../../../../../styles';
import { RecordTemplate } from '../RecordTemplate/RecordTemplate';

const TransactionManager = ({ edit = false }: { edit?: boolean }) => {
  const [typeOfRecord, setTypeOfRecord] = useState<TypeOfRecord>('expense');

  const changeTypeOfRecord = (event: React.MouseEvent<HTMLElement>, newTypeOfRecord: TypeOfRecord) => {
    setTypeOfRecord(newTypeOfRecord);
  };
  const changeTypeIncome = () => setTypeOfRecord('income');

  return (
    <RecordTemplateMain>
      <GoBackButton to={DASHBOARD_ROUTE}>
        <AppIcon icon="Close" />
      </GoBackButton>
      { (!edit) && (
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={typeOfRecord}
        onChange={changeTypeOfRecord}
        aria-label="Select type of record"
      >
        <ToggleButton value="expense">Expense</ToggleButton>
        <ToggleButton value="income">Income</ToggleButton>
        <ToggleButton value="transfer">Transfer</ToggleButton>
      </ToggleButtonGroup>
      ) }
      { (typeOfRecord !== 'transfer') && (<RecordTemplate changeTypeIncome={changeTypeIncome} typeOfRecord={typeOfRecord} edit={edit} />) }
    </RecordTemplateMain>
  );
};

export { TransactionManager };
