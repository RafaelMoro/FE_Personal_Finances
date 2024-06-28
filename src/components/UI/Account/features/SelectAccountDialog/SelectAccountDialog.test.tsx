import { screen } from '@testing-library/react';
import { SelectAccountDialog } from './SelectAccountDialog';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { AccountsInitialState } from '../../../../../redux/slices/Accounts/interface';
import { mockedAccountsUI } from '../../Account.mocks';

const accountsInitialState: AccountsInitialState = {
  accounts: mockedAccountsUI,
  accountSelected: null,
  accountsLocalStorage: null,
  accountsFetchStatus: 'isUninitialized',
};

describe('<SelectAccountDialog />', () => {
  test('Show dialog to change account showing two accounts', () => {
    renderWithProviders(
      <SelectAccountDialog open onClose={jest.fn()} />,
      { preloadedState: { accounts: accountsInitialState } },
    );

    expect(screen.getByRole('heading', { name: /choose other account/i })).toBeInTheDocument();

    const [firstAccount, secondAccount] = mockedAccountsUI;
    // Expect first account
    expect(screen.getByText(firstAccount.title)).toBeInTheDocument();
    expect(screen.getByText(firstAccount.amountFormatted)).toBeInTheDocument();
    // Expect second account
    expect(screen.getByText(secondAccount.title)).toBeInTheDocument();
    expect(screen.getByText(secondAccount.amountFormatted)).toBeInTheDocument();
  });
});
