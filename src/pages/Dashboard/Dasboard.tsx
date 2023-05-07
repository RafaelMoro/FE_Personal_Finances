import { useEffect } from 'react';
import { useAtom } from 'jotai';

import { windowSizeAtom } from '../../atoms';
import { handleResizeWindow } from '../../utils';
import { useLogin } from '../../hooks/useLogin';
import { ViewAccounts } from '../../components/UI/Account';
import { Notification, RecordList } from '../../components/UI';
import { SecondaryButton } from '../../styles';
import {
  DashboardContainer, RecordsBox, Header,
} from './Dashboard.styled';
import { IRecord } from '../../components/UI/Records/interface';
import { useNotification } from '../../hooks/useNotification';
import { SystemStateEnum } from '../../enums';
import { DashboardNotificationFunctions } from './interface';

const records: IRecord[] = [
  {
    id: '1',
    shortName: 'Uber home to gym',
    description: 'Paying Uber to go to smartfit on Solesta',
    recordType: 'Expense',
    date: new Date(),
    price: 168.02,
    budgets: [
      {
        id: 1,
        name: 'Transport',
      },
    ],
  },
  {
    id: '2',
    shortName: 'Uber home to gym',
    description: 'Paying Uber to go to smartfit on Solesta',
    recordType: 'Expense',
    date: new Date(),
    price: 168.02,
    budgets: [
      {
        id: 1,
        name: 'Transport',
      },
    ],
  },
  {
    id: '3',
    shortName: 'Uber home to gym',
    description: 'Paying Uber to go to smartfit on Solesta',
    recordType: 'Income',
    date: new Date(),
    price: 168.02,
    budgets: [
      {
        id: 1,
        name: 'Transport',
      },
    ],
  },
  {
    id: '4',
    shortName: 'Uber home to gym',
    description: 'Paying Uber to go to smartfit on Solesta',
    recordType: 'Expense',
    date: new Date(),
    price: 168.02,
    budgets: [
      {
        id: 1,
        name: 'Transport',
      },
    ],
  },
];

const Dashboard = () => {
  const [,setWindowSize] = useAtom(windowSizeAtom);
  const { signOut } = useLogin();
  const {
    showNotification, toggleShowNotification, notificationInfo,
    updateTitle, updateDescription, updateStatus,
  } = useNotification({
    title: '', description: '', status: SystemStateEnum.Info,
  });
  const dashboardNotificationFunctions: DashboardNotificationFunctions = {
    updateTitle,
    updateDescription,
    updateStatus,
    toggleShowNotification,
  };

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
      {showNotification && (
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
        <RecordList records={records} />
      </RecordsBox>
    </DashboardContainer>
  );
};

export { Dashboard };
