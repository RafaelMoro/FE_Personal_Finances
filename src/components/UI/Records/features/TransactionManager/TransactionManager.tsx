import { useState } from 'react';
import { Typography } from '@mui/material';

import { TypeOfRecord } from '../RecordTemplate/interface';
import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { RecordTemplate } from '../RecordTemplate/RecordTemplate';
import { Transfer } from '../Transfer';
import { AppIcon } from '../../../Icons';
import { ToggleButton } from '../../../../../styles';
import { GoBackButton, RecordTemplateMain, ToggleButtonGroup } from '../RecordTemplate/RecordTemplate.styled';

const TransactionManager = ({ edit = false }: { edit?: boolean }) => {
  const [typeOfRecord, setTypeOfRecord] = useState<TypeOfRecord>('expense');
  const action: string = edit ? 'Edit' : 'Create';

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
      <Typography variant="h3" align="center">
        {' '}
        { action }
        {' '}
        { typeOfRecord }
      </Typography>
      { (typeOfRecord !== 'transfer') && (<RecordTemplate changeTypeIncome={changeTypeIncome} typeOfRecord={typeOfRecord} edit={edit} />) }
      { (typeOfRecord === 'transfer') && (<Transfer action={action} />) }
    </RecordTemplateMain>
  );
};

export { TransactionManager };
