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
  selected: false,
};

describe('<Account />', () => {
  test('Render account name, price, account type', () => {
    const selectNewAccount = jest.fn();
    const handleOpenModifyAccount = jest.fn();
    render(
      <Account
        account={account}
        selectAccountOnClick={() => selectNewAccount(account)}
        openModifyAccountModal={handleOpenModifyAccount}
      />,
    );

    expect(screen.getByText('BBVA')).toBeInTheDocument();
    expect(screen.getByText('$20,000.00')).toBeInTheDocument();
    expect(screen.getByText('Debit')).toBeInTheDocument();
  });
});
