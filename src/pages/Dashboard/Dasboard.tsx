import { useAtom } from 'jotai';

import { useLogin } from '../../hooks/useLogin';
import { ViewAccounts } from '../../components/UI/Account';
import { Notification, RecordList } from '../../components/UI';
import { SecondaryButton } from '../../styles';
import {
  DashboardContainer, RecordsBox,
} from './Dashboard.styled';
import { IRecord } from '../../components/UI/Records/interface';
import { useNotification } from '../../hooks/useNotification';

import { globalNotificationAtom } from '../../atoms/atoms';

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
  const [globalNotification] = useAtom(globalNotificationAtom);
  const { title, description, status } = globalNotification;
  const {
    showNotification, toggleShowNotification, notificationInfo,
    updateTitle, updateDescription, updateStatus,
  } = useNotification({
    title, description, status,
  });
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
        updateGlobalTitle={updateTitle}
        updateGlobalDescription={updateDescription}
        updateGlobalStatus={updateStatus}
        toggleShowNotification={toggleShowNotification}
      />
      <RecordsBox>
        <RecordList records={records} />
      </RecordsBox>
    </DashboardContainer>
  );
};

export { Dashboard };
