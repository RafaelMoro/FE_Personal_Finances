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
import { useNotification } from '../../hooks/useNotification';
import { SystemStateEnum } from '../../enums';
import { DashboardNotificationFunctions } from './interface';
import { AnyRecord } from '../../components/UI/Records/interface';

const records: AnyRecord[] = [
  {
    _id: '123-456',
    shortName: 'Casa a solesta gym',
    description: 'Esta es una descripcion muy larga para darme una idea de cuanto debo de cortar aproximadamente para la vista corta y la vista larga',
    category: 'Transport',
    subCategory: 'Didi/Uber',
    tag: ['Pending'],
    indebtedPeople: [
      {
        name: 'Beto',
        amount: 30,
        amountPaid: 0,
        isPaid: false,
      },
      {
        name: 'George',
        amount: 70,
        amountPaid: 50,
        isPaid: false,
      },
      {
        name: 'Dad',
        amount: 150,
        amountPaid: 150,
        isPaid: true,
      },
    ],
    budgets: [],
    formattedTime: '12:34pm',
    fullDate: 'May 20',
    amount: '$150.09',
    account: '123-456-789',
    isPaid: false,
  },
  {
    _id: '456-789',
    shortName: 'Solesta gym a casa',
    description: 'Didi para ir a casa',
    category: 'Transport',
    subCategory: 'Didi/Uber',
    tag: ['Pending'],
    indebtedPeople: [],
    budgets: [],
    formattedTime: '1:50pm',
    fullDate: 'May 20',
    amount: '$110.24',
    account: '123-456-789',
    expensesPaid: [
      {
        _id: '64600b8f2bb57b9d17843d87',
        shortName: 'Chilaquiles',
        amount: '$96.03',
        fullDate: 'May 20',
        formattedTime: '1:50pm',
      },
      {
        _id: '64600b8f2bb57b9d17843d87',
        shortName: 'Chilaquiles',
        amount: '$96.03',
        fullDate: 'May 20',
        formattedTime: '1:50pm',
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
        <RecordList />
      </RecordsBox>
    </DashboardContainer>
  );
};

export { Dashboard };
