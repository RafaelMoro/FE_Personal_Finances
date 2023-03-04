import { useLogin } from '../../hooks/useLogin';
import { ViewAccounts } from './features';
import { RecordList } from '../../components/UI';
import { SecondaryButton } from '../../styles';
import {
  DashboardContainer, RecordsBox,
} from './Dashboard.styled';
import { IRecord } from '../../components/UI/Records/interface';

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
  return (
    <DashboardContainer>
      <SecondaryButton variant="contained" size="medium" onClick={signOut}>Sign out</SecondaryButton>
      <ViewAccounts />
      <RecordsBox>
        <RecordList records={records} />
      </RecordsBox>
    </DashboardContainer>
  );
};

export { Dashboard };
