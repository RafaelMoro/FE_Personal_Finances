import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import { DeleteAccountDialog } from './DeleteAccountDialog';
import { WrapperRedux } from '../../../../../tests/WrapperRedux';

describe('<DeleteAccountDialog />', () => {
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
});
