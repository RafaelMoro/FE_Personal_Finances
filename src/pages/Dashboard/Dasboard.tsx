import { useState } from 'react';

import { SelectAccountDialog, ViewAccounts } from './features';
import { RecordList } from '../../components/UI';
import {
  DashboardContainer, RecordsBox,
} from './Dashboard.styled';
import { IAccount } from '../../components/UI/Account/interface';
import { IRecord } from '../../components/UI/Records/interface';

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
      <ViewAccounts selectedAccount={selectedAccount} handleClickOpen={handleClickOpen} />
      <RecordsBox>
        <RecordList records={records} />
      </RecordsBox>
      <SelectAccountDialog
        accounts={mockedAccounts}
        selectedAccount={selectedAccount}
        open={openAccountModal}
        onClose={handleClickClose}
      />
    </DashboardContainer>
  );
};

export { Dashboard };
