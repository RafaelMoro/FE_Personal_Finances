import { useState } from 'react';

import { AccountDialog } from './features/AccountsDialog/AccountsDialog';
import {
  DashboardContainer, AccountSection, RecordsBox,
  AccountsTitle, AccountsContainer, ChangeAccountButton,
} from './Dashboard.styled';
import { IAccount } from '../../components/UI/Account/interface';
import { IRecord } from '../../components/UI/Records/interface';
import { Account, RecordList } from '../../components/UI';

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

const mockedAccounts: IAccount[] = [
  {
    id: 1,
    title: 'Zero',
    amount: 7500,
    accountType: 'Credit',
    bgColor: 'grey',
  },
  {
    id: 2,
    title: '2now',
    amount: 15000,
    accountType: 'Credit',
    bgColor: 'black',
  },
  {
    id: 3,
    title: 'Santander',
    amount: 678,
    accountType: 'Debit',
    bgColor: 'darkRed',
  },
  {
    id: 4,
    title: 'BBVA',
    amount: 3700,
    accountType: 'Savings',
    bgColor: 'azure',
    color: 'black',
  },
];

const Dashboard = () => {
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(mockedAccounts[0]);

  const handleClickOpen = () => {
    setOpenAccountModal(true);
  };

  const handleClickClose = (account: IAccount) => {
    setOpenAccountModal(false);
    setSelectedAccount(account);
  };

  return (
    <DashboardContainer>
      <AccountSection>
        <AccountsTitle>Account: </AccountsTitle>
        <ChangeAccountButton variant="contained" size="medium" onClick={handleClickOpen}>Change account</ChangeAccountButton>
        <AccountsContainer>
          <Account
            id={selectedAccount.id}
            title={selectedAccount.title}
            amount={selectedAccount.amount}
            accountType={selectedAccount.accountType}
            bgColor={selectedAccount.bgColor}
            color={selectedAccount?.color ?? 'white'}
            selected
          />
        </AccountsContainer>
      </AccountSection>
      <RecordsBox>
        <RecordList records={records} />
      </RecordsBox>
      <AccountDialog
        accounts={mockedAccounts}
        selectedAccount={selectedAccount}
        open={openAccountModal}
        onClose={handleClickClose}
      />
    </DashboardContainer>
  );
};

export { Dashboard };
