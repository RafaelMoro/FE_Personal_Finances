import { useState } from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../../../redux/hooks';
import { TypeOfRecord } from '../../../../../globalInterface';
import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { RecordTemplate } from '../RecordTemplate/RecordTemplate';
import { Transfer } from '../Transfer';
import { AppIcon } from '../../../Icons';
import { ToggleButton } from '../../../../../styles';
import { GoBackButton, RecordTemplateMain, ToggleButtonGroup } from '../RecordTemplate/RecordTemplate.styled';

const TransactionManager = ({ edit = false }: { edit?: boolean }) => {
  const location = useLocation();
  const typeOfRecordState: TypeOfRecord | undefined = location?.state?.typeOfRecord;
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const hasOnlyOneAccount = accounts?.length === 1;
  const [typeOfRecord, setTypeOfRecord] = useState<TypeOfRecord>(typeOfRecordState ?? 'expense');
  const action: string = edit ? 'Edit' : 'Create';

  const changeTypeOfRecord = (event: React.MouseEvent<HTMLElement>, newTypeOfRecord: TypeOfRecord) => {
    setTypeOfRecord(newTypeOfRecord);
  };

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
        { (!hasOnlyOneAccount) && (<ToggleButton value="transfer">Transfer</ToggleButton>) }
      </ToggleButtonGroup>
      ) }
      <Typography variant="h3" align="center">
        {' '}
        { action }
        {' '}
        { typeOfRecord }
      </Typography>
      { (typeOfRecord !== 'transfer') && (<RecordTemplate typeOfRecord={typeOfRecord} edit={edit} />) }
      {(typeOfRecord === 'transfer' && !hasOnlyOneAccount) && (
      <Transfer typeOfRecord={typeOfRecord} action={action} />
      )}
    </RecordTemplateMain>
  );
};

export { TransactionManager };
