import { AddCard, AddTask, CompareArrows } from '@mui/icons-material';

import { SpeedDialActions, CurrentDashboardActionsProps } from './interface';
import { useAccountsActions } from '../../../hooks/useAccountsActions';

const useDashboardActions = ({
  hideChangeAccount = false, hideAddRecord = false,
}: CurrentDashboardActionsProps) => {
  const { handleOpenCreateAccount, handleOpenChangeAccount } = useAccountsActions();
  // need to change create record action
  const createRecord: SpeedDialActions = {
    icon: <AddTask />, name: 'Create Record', actionCallback: () => {},
  };
  const changeAccount: SpeedDialActions = {
    icon: <CompareArrows />, name: 'Change Account', actionCallback: handleOpenChangeAccount,
  };
  const createAccount: SpeedDialActions = {
    icon: <AddCard />, name: 'Create Account', actionCallback: handleOpenCreateAccount,
  };

  const dashboardActions = [];
  if (!hideAddRecord) dashboardActions.push(createRecord);
  if (!hideChangeAccount) dashboardActions.push(changeAccount);
  dashboardActions.push(createAccount);

  return {
    dashboardActions,
  };
};

export { useDashboardActions };
