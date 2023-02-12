import { Divider, List, ListItem } from '@mui/material';
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
      <List component="nav">
        <ListItem button>
          <Records
            shortName={record.shortName}
            description={record.description}
            recordType="Expense"
            price={record.price}
            budgets={record.budgets}
            date={new Date()}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <Records
            shortName={record.shortName}
            description={record.description}
            recordType="Expense"
            price={record.price}
            budgets={record.budgets}
            date={new Date()}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <Records
            shortName={record.shortName}
            description={record.description}
            recordType="Income"
            price={record.price}
            budgets={record.budgets}
            date={new Date()}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <Records
            shortName={record.shortName}
            description={record.description}
            recordType="Expense"
            price={record.price}
            budgets={record.budgets}
            date={new Date()}
          />
        </ListItem>
        <Divider />
      </List>
    </RecordsBox>
  </DashboardContainer>
);

export { Dashboard };
