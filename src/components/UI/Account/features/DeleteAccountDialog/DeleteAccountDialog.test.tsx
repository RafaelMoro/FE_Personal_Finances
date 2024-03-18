import { render, screen } from '@testing-library/react';
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
});
