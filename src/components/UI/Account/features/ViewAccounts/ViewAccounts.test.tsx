import fetchMock from 'jest-fetch-mock';
import { waitFor, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { ViewAccounts } from './ViewAccounts';
import { accountsActions, successfulResponseFetchAccounts, userInitialState } from '../../Account.mocks';

describe('ViewAccounts', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // It will show only the first one
  test('Show accounts on mobile', async () => {
    fetchMock.once(JSON.stringify(successfulResponseFetchAccounts));
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
