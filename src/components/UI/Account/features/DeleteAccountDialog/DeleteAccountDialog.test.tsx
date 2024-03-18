import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import { DeleteAccountDialog } from './DeleteAccountDialog';
import { WrapperRedux } from '../../../../../tests/WrapperRedux';

const successfulResponse = {
  version: '2.0.0',
  success: true,
  message: 'Account Deleted',
  data: {
    accountDeleted: {
      _id: '123',
      title: 'Bank account',
      accountType: 'Credit',
      backgroundColor: 'Teal',
      color: 'White',
      amount: 499,
      sub: '123-456',
      __v: 0,
    },
    numberExpensesDeleted: 0,
    numberIncomesDeleted: 3,
  },
  error: null,
};

describe('<DeleteAccountDialog />', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('When the user wants to delete an account, show a dialog with title, text and buttons', () => {
    const accountId = '123';
    const accountName = 'Bank account';
    const open = true;
    const onClose = jest.fn();

    render(
      <WrapperRedux>
        <DeleteAccountDialog accountId={accountId} open={open} onClose={onClose} accountName={accountName} />
      </WrapperRedux>,
    );

    expect(screen.getByRole('heading', { name: /delete account/i })).toBeInTheDocument();
    expect(screen.getByText(`Are you sure you want to delete the account ${accountName}?`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete account/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
  });

  test('When the user wants to delete an account, the dialog opens to delete an account, then the user clicks on go back button', async () => {
    const accountId = '123';
    const accountName = 'Bank account';
    const open = true;
    const onClose = jest.fn();

    render(
      <WrapperRedux>
        <DeleteAccountDialog accountId={accountId} open={open} onClose={onClose} accountName={accountName} />
      </WrapperRedux>,
    );

    userEvent.click(screen.getByRole('button', { name: /go back/i }));

    expect(onClose).toHaveBeenCalled();
  });

  test('When the user wants to delete an account, the dialog opens to delete an account, then the user clicks on delete account button', async () => {
    const accountId = '123';
    const accountName = 'Bank account';
    const open = true;
    const onClose = jest.fn();
    fetchMock.once(JSON.stringify(successfulResponse));

    render(
      <WrapperRedux>
        <DeleteAccountDialog accountId={accountId} open={open} onClose={onClose} accountName={accountName} />
      </WrapperRedux>,
    );

    userEvent.click(screen.getByRole('button', { name: /delete account/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});
