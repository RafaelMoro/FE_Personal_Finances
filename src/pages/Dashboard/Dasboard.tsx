import { useEffect } from 'react';
import { useAtom } from 'jotai';

import { windowSizeAtom, accountsUIAtom } from '../../atoms';
import { handleResizeWindow } from '../../utils';
import { useLogin } from '../../hooks/useLogin';
import { ViewAccounts } from '../../components/UI/Account';
import { Notification, RecordList, SpeedDial } from '../../components/UI';
import { SecondaryButton } from '../../styles';
import {
  DashboardContainer, RecordsBox, Header,
} from './Dashboard.styled';
import { useNotification } from '../../hooks/useNotification';
import { SystemStateEnum } from '../../enums';
import { useDashboardActions } from '../../components/UI/SpeedDial/useDashboardActions';
import { NotificationFunctions } from './interface';

const Dashboard = () => {
  const [accountsUI] = useAtom(accountsUIAtom);
  const [windowSize, setWindowSize] = useAtom(windowSizeAtom);
  const { signOut } = useLogin();
  const {
    notification, toggleShowNotification, notificationInfo,
    updateTitle, updateDescription, updateStatus,
  } = useNotification({
    title: '', description: '', status: SystemStateEnum.Info,
  });
  const dashboardNotificationFunctions: NotificationFunctions = {
    updateTitle,
    updateDescription,
    updateStatus,
    toggleShowNotification,
  };

  const { dashboardActions } = useDashboardActions({
    // Set it as true if accountsUI array has more than 1 item.
    hideChangeAccount: (accountsUI.length < 2 || windowSize !== 'Mobile'),
    // Set it as true if accountsUI array is empty
    hideAddRecord: (accountsUI.length === 0),
  });

  useEffect(() => {
    if (window.innerWidth > 480 && window.innerWidth < 1024) setWindowSize('Tablet');
    if (window.innerWidth > 1024) setWindowSize('Desktop');

    window.addEventListener('resize', (event: UIEvent) => {
      const windowResized = handleResizeWindow(event);
      setWindowSize(windowResized);
    });

    return () => window.removeEventListener('resize', (event: UIEvent) => {
      const windowResized = handleResizeWindow(event);
      setWindowSize(windowResized);
    });
  }, [setWindowSize]);

  return (
    <DashboardContainer>
      {notification && (
        <Notification
          title={notificationInfo.current.title}
          description={notificationInfo.current.description}
          status={notificationInfo.current.status}
          close={toggleShowNotification}
        />
      )}
      <Header>
        <SecondaryButton variant="contained" size="medium" onClick={signOut}>Sign out</SecondaryButton>
      </Header>
      <ViewAccounts
        dashboardNotificationFunctions={dashboardNotificationFunctions}
      />
      <RecordsBox>
        <RecordList />
      </RecordsBox>
      <SpeedDial
        actions={dashboardActions}
        ariaLabelDescription="SpeedDial Accounts and Records actions"
      />
    </DashboardContainer>
  );
};

export { Dashboard };
