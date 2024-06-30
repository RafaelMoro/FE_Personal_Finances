import fetchMock from 'jest-fetch-mock';
import { waitFor, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { ViewAccounts } from './ViewAccounts';
import {
  accountsActions, successfulResponseFetchAccounts, unsuccessfulResponseFetchAccounts, userInitialState,
} from '../../Account.mocks';
import { getInitialUserInterfaceState } from '../../../../../tests/Global.mocks';

describe('ViewAccounts', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('View accounts on mobile', () => {
    test('Show loader while loading on mobile', async () => {
      renderWithProviders(
        <ViewAccounts hide={null} accountsActions={accountsActions} />,
        { preloadedState: { user: userInitialState } },
      );

      expect(screen.getByTestId('account-loading-skeleton')).toBeInTheDocument();
    });
    // It will show only the first account because it's mobile view
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

    test('Show error if it was not possible to fetch the accounts on mobile', async () => {
      fetchMock.once(JSON.stringify(unsuccessfulResponseFetchAccounts));
      renderWithProviders(
        <ViewAccounts hide={null} accountsActions={accountsActions} />,
        { preloadedState: { user: userInitialState } },
      );

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalled();
        expect(screen.getByText('Error.')).toBeInTheDocument();
        expect(screen.getByText('Please try again later. If the error persists, contact support with the error code.')).toBeInTheDocument();
      });
    });
  });

  describe('View accounts on tablet', () => {
    const initialUserInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Tablet' });

    test('Show loader while loading on tablet', async () => {
      renderWithProviders(
        <ViewAccounts hide={null} accountsActions={accountsActions} />,
        { preloadedState: { user: userInitialState, userInterface: initialUserInterfaceState } },
      );

      expect(screen.getAllByTestId('account-loading-skeleton').length).toBe(4);
    });

    test('Show accounts on tablet', async () => {
      fetchMock.once(JSON.stringify(successfulResponseFetchAccounts));
      renderWithProviders(
        <ViewAccounts hide={null} accountsActions={accountsActions} />,
        { preloadedState: { user: userInitialState, userInterface: initialUserInterfaceState } },
      );

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalled();
        // First account
        expect(screen.getByText('Citibanamex Debit')).toBeInTheDocument();
        expect(screen.getByText('$8,246.41')).toBeInTheDocument();
        expect(screen.getByText('Debit')).toBeInTheDocument();

        // Second Account
        expect(screen.getByText('American Express')).toBeInTheDocument();
        expect(screen.getByText('$80,000.00')).toBeInTheDocument();
        expect(screen.getByText('Credit')).toBeInTheDocument();
      });
    });

    test('Show error if it was not possible to fetch the accounts on tablet', async () => {
      fetchMock.once(JSON.stringify(unsuccessfulResponseFetchAccounts));
      renderWithProviders(
        <ViewAccounts hide={null} accountsActions={accountsActions} />,
        { preloadedState: { user: userInitialState, userInterface: initialUserInterfaceState } },
      );

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalled();
        expect(screen.getByText('Error.')).toBeInTheDocument();
        expect(screen.getByText('Please try again later. If the error persists, contact support with the error code.')).toBeInTheDocument();
      });
    });
  });

  describe('View accounts on desktop', () => {
    const initialUserInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Desktop' });

    test('Show loader while loading on desktop', async () => {
      renderWithProviders(
        <ViewAccounts hide={null} accountsActions={accountsActions} />,
        { preloadedState: { user: userInitialState, userInterface: initialUserInterfaceState } },
      );

      expect(screen.getAllByTestId('account-loading-skeleton').length).toBe(4);
    });

    test('Show accounts on desktop', async () => {
      fetchMock.once(JSON.stringify(successfulResponseFetchAccounts));
      renderWithProviders(
        <ViewAccounts hide={null} accountsActions={accountsActions} />,
        { preloadedState: { user: userInitialState, userInterface: initialUserInterfaceState } },
      );

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalled();
        // First account
        expect(screen.getByText('Citibanamex Debit')).toBeInTheDocument();
        expect(screen.getByText('$8,246.41')).toBeInTheDocument();
        expect(screen.getByText('Debit')).toBeInTheDocument();

        // Second Account
        expect(screen.getByText('American Express')).toBeInTheDocument();
        expect(screen.getByText('$80,000.00')).toBeInTheDocument();
        expect(screen.getByText('Credit')).toBeInTheDocument();
      });
    });

    test('Show error if it was not possible to fetch the accounts in desktop', async () => {
      fetchMock.once(JSON.stringify(unsuccessfulResponseFetchAccounts));
      renderWithProviders(
        <ViewAccounts hide={null} accountsActions={accountsActions} />,
        { preloadedState: { user: userInitialState, userInterface: initialUserInterfaceState } },
      );

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalled();
        expect(screen.getByText('Error.')).toBeInTheDocument();
        expect(screen.getByText('Please try again later. If the error persists, contact support with the error code.')).toBeInTheDocument();
      });
    });
  });
});
