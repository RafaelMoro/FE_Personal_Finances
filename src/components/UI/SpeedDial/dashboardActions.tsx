import { AddCard, AddTask, CompareArrows } from '@mui/icons-material';
import { SpeedDialActions, CurrentDashboardActionsProps } from './interface';

const createRecord: SpeedDialActions = { icon: <AddTask />, name: 'Create Record' };
const changeAccount: SpeedDialActions = { icon: <CompareArrows />, name: 'Change Account' };
const createAccount: SpeedDialActions = { icon: <AddCard />, name: 'Create Account' };

export const currentDashboardActions = ({
  hideChangeAccount = false, hideAddRecord = false,
}: CurrentDashboardActionsProps) => {
  const dashboardActions = [];
  if (!hideAddRecord) dashboardActions.push(createRecord);
  if (!hideChangeAccount) dashboardActions.push(changeAccount);
  dashboardActions.push(createAccount);

  return dashboardActions;
};
