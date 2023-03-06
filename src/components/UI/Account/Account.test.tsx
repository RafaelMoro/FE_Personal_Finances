import { render, screen } from '@testing-library/react';

import { AccountUI } from './interface';
import { Account } from './Account';

const account: AccountUI = {
  _id: '1',
  title: 'BBVA',
  amount: '$20,000.00',
  accountType: 'Debit',
  backgroundColor: 'red',
  color: 'white',
};

describe('<Account />', () => {
  test('Render account name, price, account type', () => {
    render(
      <Account
        _id={account._id}
        title={account.title}
        amount={account.amount}
        accountType={account.accountType}
        backgroundColor={account.backgroundColor}
        color={account.color}
        openModifyAccountModal={() => {}}
      />,
    );

    expect(screen.getByText('BBVA')).toBeInTheDocument();
    expect(screen.getByText('$20,000.00')).toBeInTheDocument();
    expect(screen.getByText('Debit')).toBeInTheDocument();
  });
});
