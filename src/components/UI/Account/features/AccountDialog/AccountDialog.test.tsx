import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccountDialog } from './AccountDialog';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';

beforeEach(() => {
  // having console error because of formik.
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('<AccountDialog />', () => {
  beforeEach(() => {
    renderWithProviders(
      <AccountDialog
        open
        onClose={jest.fn()}
        accountAction="Create"
        account={null}
      />,
      { preloadedState: {} },
    );
  });
  test('Show a dialog to create an account', () => {
    const title = screen.getByRole('heading', {
      name: /create account:/i,
    });
    const accountTitleTextBox = screen.getByRole('textbox', {
      name: /account title/i,
    });
    const amountTextBox = screen.getByRole('textbox', {
      name: /amount/i,
    });
    const typeOfAccountSelectInput = screen.getByText(/debit/i);
    const colorTextBoxSelectInput = screen.getByText(/dark orange/i);
    const createAccountByutton = screen.getByRole('button', {
      name: /create account/i,
    });

    expect(title).toBeInTheDocument();
    expect(accountTitleTextBox).toBeInTheDocument();
    expect(amountTextBox).toBeInTheDocument();
    expect(typeOfAccountSelectInput).toBeInTheDocument();
    expect(colorTextBoxSelectInput).toBeInTheDocument();
    expect(createAccountByutton).toBeInTheDocument();
  });

  test('If account title and amount are empty, show validaton error', async () => {
    const createAccountByutton = screen.getByRole('button', {
      name: /create account/i,
    });

    userEvent.click(createAccountByutton);

    await waitFor(() => {
      expect(screen.getByText(/the title of your account is required\./i)).toBeInTheDocument();
      expect(screen.getByText(/the initial amount of your account is required\./i)).toBeInTheDocument();
    });
  });
});
