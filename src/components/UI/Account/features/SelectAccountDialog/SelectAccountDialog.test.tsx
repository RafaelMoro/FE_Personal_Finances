import { screen } from '@testing-library/react';
import { SelectAccountDialog } from './SelectAccountDialog';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { AccountsInitialState } from '../../../../../redux/slices/Accounts/interface';
import { AccountUI } from '../../Account.interface';

const accounts: AccountUI[] = [
  {
    _id: '1',
    __v: 0,
    title: 'Bank account 1',
    amount: 20000,
    amountFormatted: '$20,000.00',
    accountType: 'Debit',
    backgroundColor: 'red',
    color: 'white',
    backgroundColorUI: { name: 'red', color: 'red' },
    colorUI: { name: 'white', color: 'white' },
    selected: true,
  },
  {
    _id: '2',
    __v: 0,
    title: 'Bank account 2',
    amount: 30000,
    amountFormatted: '$30,000.00',
    accountType: 'Credit',
    backgroundColor: 'blue',
    color: 'white',
    backgroundColorUI: { name: 'blue', color: 'blue' },
    colorUI: { name: 'white', color: 'white' },
    selected: false,
  },
];

const accountsInitialState: AccountsInitialState = {
  accounts,
  accountSelected: null,
  accountsFetchStatus: 'isUninitialized',
};

describe('<SelectAccountDialog />', () => {
  test('Show dialog to change account showing two accounts', () => {
    renderWithProviders(
      <SelectAccountDialog open onClose={jest.fn()} />,
      { preloadedState: { accounts: accountsInitialState } },
    );

    expect(screen.getByRole('heading', { name: /choose other account/i })).toBeInTheDocument();

    const [firstAccount, secondAccount] = accounts;
    // Expect first account
    expect(screen.getByText(firstAccount.title)).toBeInTheDocument();
    expect(screen.getByText(firstAccount.amountFormatted)).toBeInTheDocument();
    // Expect second account
    expect(screen.getByText(secondAccount.title)).toBeInTheDocument();
    expect(screen.getByText(secondAccount.amountFormatted)).toBeInTheDocument();
  });
});
