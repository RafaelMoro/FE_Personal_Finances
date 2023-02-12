import {
  DashboardContainer, AccountsBox, RecordsBox, AccountsTitle,
} from './Dashboard.styled';
import { Account, AddAccount, Records } from '../../components/UI';

const record = {
  shortName: 'Uber home to gym',
  description: 'Paying Uber to go to smartfit on Solesta',
  price: 168.02,
  budgets: [
    {
      id: 1,
      name: 'Transport',
    },
  ],
};

const Dashboard = () => (
  <DashboardContainer>
    <AccountsBox>
      <AccountsTitle>Accounts: </AccountsTitle>
      <Account title="Zero" amount={18000} accountType="Debit" bgColor="grey" color="white" selected />
      <Account title="BBVA" amount={1638.69} accountType="Debit" bgColor="red" color="white" />
      <AddAccount />
    </AccountsBox>
    <RecordsBox>
      <Records
        shortName={record.shortName}
        description={record.description}
        price={record.price}
        budgets={record.budgets}
        date={new Date()}
      />
      <Records
        shortName={record.shortName}
        description={record.description}
        price={record.price}
        budgets={record.budgets}
        date={new Date()}
      />
      <Records
        shortName={record.shortName}
        description={record.description}
        price={record.price}
        budgets={record.budgets}
        date={new Date()}
      />
      <Records
        shortName={record.shortName}
        description={record.description}
        price={record.price}
        budgets={record.budgets}
        date={new Date()}
      />
      <Records
        shortName={record.shortName}
        description={record.description}
        price={record.price}
        budgets={record.budgets}
        date={new Date()}
      />
    </RecordsBox>
  </DashboardContainer>
);

export { Dashboard };
