import {
  DashboardContainer, AccountsBox, RecordsBox, AccountsTitle,
} from './Dashboard.styled';
import { IRecord } from '../../components/UI/Records/interface';
import { Account, AddAccount, RecordList } from '../../components/UI';

const records: IRecord[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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

const Dashboard = () => (
  <DashboardContainer>
    <AccountsBox>
      <AccountsTitle>Accounts: </AccountsTitle>
      <Account title="Zero" amount={18000} accountType="Debit" bgColor="grey" color="white" selected />
      <Account title="BBVA" amount={1638.69} accountType="Debit" bgColor="red" color="white" />
      <AddAccount />
    </AccountsBox>
    <RecordsBox>
      <RecordList records={records} />
    </RecordsBox>
  </DashboardContainer>
);

export { Dashboard };
