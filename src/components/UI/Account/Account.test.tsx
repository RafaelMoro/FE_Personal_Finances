import { render, screen } from '@testing-library/react';

import { IAccount } from './interface';
import { Account } from './Account';

const account: IAccount = {
  id: 1,
  title: 'BBVA',
  amount: 20000,
  accountType: 'Debit',
  bgColor: 'red',
  color: 'white',
};

describe('<Account />', () => {
  test('Render account name, price, account type', () => {
    render(
      <Account
        id={account.id}
        title={account.title}
        amount={account.amount}
        accountType={account.accountType}
        bgColor={account.bgColor}
        color={account.color}
      />,
    );

    expect(screen.getByText('BBVA')).toBeInTheDocument();
    expect(screen.getByText('$20,000.00')).toBeInTheDocument();
    expect(screen.getByText('Debit')).toBeInTheDocument();
  });
});
