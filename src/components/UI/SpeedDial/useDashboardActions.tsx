import { useNavigate } from 'react-router-dom';
import { AddCard, AddTask, CompareArrows } from '@mui/icons-material';

import { SpeedDialActions, CurrentDashboardActionsProps } from './interface';
import { useAccountsActions } from '../../../hooks/useAccountsActions';
import { CREATE_RECORD_ROUTE } from '../../../pages/Dashboard/constants';

const useDashboardActions = ({
  hideChangeAccount = false, hideAddRecord = false,
}: CurrentDashboardActionsProps) => {
  const { handleOpenCreateAccount, handleOpenChangeAccount } = useAccountsActions();
  const navigate = useNavigate();
  const navigateToCreateRecord = () => navigate(CREATE_RECORD_ROUTE);

  const createRecord: SpeedDialActions = {
    icon: <AddTask />, name: 'Create Record', actionCallback: navigateToCreateRecord,
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
