import { useLogin } from '../../hooks/useLogin';
import { ViewAccounts } from '../../components/UI/Account';
import { Notification, RecordList } from '../../components/UI';
import { SecondaryButton } from '../../styles';
import {
  DashboardContainer, RecordsBox,
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
      <SecondaryButton variant="contained" size="medium" onClick={signOut}>Sign out</SecondaryButton>
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
