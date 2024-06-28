import { screen } from '@testing-library/react';
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

    expect(title).toBeInTheDocument();
    expect(accountTitleTextBox).toBeInTheDocument();
    expect(amountTextBox).toBeInTheDocument();
    expect(typeOfAccountSelectInput).toBeInTheDocument();
    expect(colorTextBoxSelectInput).toBeInTheDocument();
  });
});
