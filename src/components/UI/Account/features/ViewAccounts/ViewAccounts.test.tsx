import fetchMock from 'jest-fetch-mock';
import { waitFor, screen } from '@testing-library/react';
import { UserInitialState } from '../../../../../redux/slices/User/interface';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { AccountActions } from '../../Account.interface';
import { ViewAccounts } from './ViewAccounts';
import { mockedAccounts } from '../../Account.mocks';

const userInitialState: UserInitialState = {
  userInfo: {
    bearerToken: 'The bearer token',
    accessToken: 'The access token',
    user: {
      email: 'email@email.com',
      firstName: 'John',
      lastName: 'Doe',
      middleName: '',
      sub: 'sub-user-id-123',
    },
  },
};

const accountsActions: AccountActions = {
  accountAction: 'Create',
  openAccountModal: false,
  openChangeToOtherAccountModal: false,
  modifyAccount: null,
  openDeleteAccountModal: false,
  accountToBeDeleted: { current: { accountId: '', accountName: '' } },
  handleCloseAccountModal: jest.fn(),
  handleOpenCreateAccount: jest.fn(),
  handleOpenModifyAccount: jest.fn(),
  toggleChangeOtherAccountModal: jest.fn(),
  handleCloseDeleteAccount: jest.fn(),
  handleOpenDeleteAccount: jest.fn(),
};

const response = {
  data: {
    accounts: mockedAccounts,
  },
  error: null,
  message: null,
  success: true,
  version: '2.0.0',
};

describe('ViewAccounts', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // It will show only the first one
  test('Show accounts on mobile', async () => {
    fetchMock.once(JSON.stringify(response));
    renderWithProviders(
      <ViewAccounts hide={null} accountsActions={accountsActions} />,
      { preloadedState: { user: userInitialState } },
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      expect(screen.getByText('Citibanamex Debit')).toBeInTheDocument();
      expect(screen.getByText('$8,246.41')).toBeInTheDocument();
    });
  });
});
