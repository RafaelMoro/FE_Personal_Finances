/* eslint-disable no-console */
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

import { ResetPassword } from './ResetPassword';
import { WrapperRedux } from '../../../tests/WrapperRedux';
import { LOGIN_ROUTE } from '../../RoutesConstants';

beforeEach(() => {
  // having console error because of formik.
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

// I'm not mocking invalid jwt as the backend returns a 400 error as well.
// It's reduntant as the frontend will show an error notification
const expiredTokenResponse = {
  version: '2.0.0',
  success: false,
  message: null,
  data: null,
  error: {
    error: 'Bad Request',
    message: 'Invalid signature',
    statusCode: 400,
  },
};
const successfulResponse = {
  version: '2.0.0',
  success: true,
  message: 'Reset password Successfully',
  data: null,
  error: null,
};

describe('Reset password page', () => {
  let passwordInput: HTMLElement | null = null;
  let confirmPasswordInput: HTMLElement | null = null;
  let resetPasswordButton: HTMLElement | null = null;
  let errorMessage: HTMLElement | null = null;
  let textForPasswordInput: string | null = null;

  test('Render Reset Password page', () => {
    const history = createMemoryHistory();
    render(
      <WrapperRedux>
        <Router location={history.location} navigator={history}>
          <ResetPassword />
        </Router>
      </WrapperRedux>,
    );

    expect(screen.getByRole('heading', { name: /reset password/i })).toBeInTheDocument();
    expect(screen.getByText(/enter your new password in the fields below:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
  });

  describe('Validations of the inputs form and submit form', () => {
    beforeEach(() => {
      const history = createMemoryHistory();
      render(
        <WrapperRedux>
          <Router location={history.location} navigator={history}>
            <ResetPassword />
          </Router>
        </WrapperRedux>,
      );
    });

    test('Password and confirm password inputs are empty and click button, return error message where those inputs are required', async () => {
      resetPasswordButton = screen.getByRole('button', { name: /reset password/i });

      fireEvent.click(resetPasswordButton);

      await waitFor(() => {
        expect(screen.getByText(/new password is required/i)).toBeInTheDocument();
        expect(screen.getByText(/confirm password is required/i)).toBeInTheDocument();
      });
    });

    test('Type one character in password input and click button, return error message to have 8 minimum characters', async () => {
      passwordInput = screen.getByLabelText(/new password/i);
      resetPasswordButton = screen.getByRole('button', { name: /reset password/i });

      userEvent.type(passwordInput, 'a');
      fireEvent.click(resetPasswordButton);

      await waitFor(() => {
        errorMessage = screen.getByText(/the password should be 8 characters minimum/i);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    test('Type 8 characters with no capital letter and click button, return error message to include 1 capital letter', async () => {
      passwordInput = screen.getByLabelText(/new password/i);
      resetPasswordButton = screen.getByRole('button', { name: /reset password/i });
      textForPasswordInput = 'aksyctdk';

      userEvent.type(passwordInput, textForPasswordInput);
      fireEvent.click(resetPasswordButton);

      await waitFor(() => {
        errorMessage = screen.getByText(/the password should contain at least 1 capital letter/i);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    test('Type 8 characters, 1 capital letter and click button. Return error message to include at least 1 number', async () => {
      passwordInput = screen.getByLabelText(/new password/i);
      resetPasswordButton = screen.getByRole('button', { name: /reset password/i });
      textForPasswordInput = 'aksyctdkC';

      userEvent.type(passwordInput, textForPasswordInput);
      fireEvent.click(resetPasswordButton);

      await waitFor(() => {
        errorMessage = screen.getByText(/the password should contain at least 1 number/i);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    test(`Type 8 characters, 1 capital letter, 1 number and click button.
    Return error message to include at least 1 special character`, async () => {
      passwordInput = screen.getByLabelText(/new password/i);
      resetPasswordButton = screen.getByRole('button', { name: /reset password/i });
      textForPasswordInput = 'aksyctdkC1';

      userEvent.type(passwordInput, textForPasswordInput);
      fireEvent.click(resetPasswordButton);

      await waitFor(() => {
        errorMessage = screen.getByText(/the password should contain at least 1 special character/i);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    test(`Type 8 characters, 1 capital letter, 1 number, 1 special character, a space and click button.
    Return error message to do not include white`, async () => {
      passwordInput = screen.getByLabelText(/new password/i);
      resetPasswordButton = screen.getByRole('button', { name: /reset password/i });
      textForPasswordInput = 'aksyctdkC1@ ';

      userEvent.type(passwordInput, textForPasswordInput);
      fireEvent.click(resetPasswordButton);

      await waitFor(() => {
        errorMessage = screen.getByText(/the password should not contain white spaces/i);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    test('Type 32 characters and click button. Return error message to type password less than 32 characters', async () => {
      passwordInput = screen.getByLabelText(/new password/i);
      resetPasswordButton = screen.getByRole('button', { name: /reset password/i });
      textForPasswordInput = 'alsocuetdhskcirtshdleoapsowkrndiww ';

      userEvent.type(passwordInput, textForPasswordInput);
      fireEvent.click(resetPasswordButton);

      await waitFor(() => {
        errorMessage = screen.getByText(/the password should be 32 characters maximum/i);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    test('Fill the password input correctly, type a character, click button. Return error message that both inputs should match.', async () => {
      passwordInput = screen.getByLabelText(/new password/i);
      confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      resetPasswordButton = screen.getByRole('button', { name: /reset password/i });
      textForPasswordInput = 'ThisIsMyPassword1@';

      userEvent.type(passwordInput, textForPasswordInput);
      userEvent.type(confirmPasswordInput, 'a');
      fireEvent.click(resetPasswordButton);

      await waitFor(() => {
        errorMessage = screen.getByText(/new password and confirm password must match/i);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe('Validate the user reseting the password', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
      jest.clearAllMocks();
    });

    test('When the token has expired or invalid, then the user tries to reset his password, a notification error appears.', async () => {
      const password = 'MiContraseña2022!';
      const history = createMemoryHistory();
      fetchMock.mockRejectedValueOnce(JSON.stringify(expiredTokenResponse));
      render(
        <WrapperRedux>
          <Router location={history.location} navigator={history}>
            <ResetPassword />
          </Router>
        </WrapperRedux>,
      );
      passwordInput = screen.getByLabelText(/new password/i);
      confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      resetPasswordButton = screen.getByRole('button', { name: /reset password/i });

      // Mock the rejected value response

      userEvent.type(passwordInput, password);
      userEvent.type(confirmPasswordInput, password);
      fireEvent.click(resetPasswordButton);

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalled();
        const errorNotification = screen.getByRole('heading', { name: /error/i });
        expect(errorNotification).toBeInTheDocument();
      });
    });

    test(`When the user resets his password successfully, then a success notification is shown,
    then the user is redirected to the login page`, async () => {
      const history = createMemoryHistory();
      fetchMock.once(JSON.stringify(successfulResponse));
      render(
        <WrapperRedux>
          <Router location={history.location} navigator={history}>
            <ResetPassword />
          </Router>
        </WrapperRedux>,
      );

      const password = 'MiContraseña2022!';
      passwordInput = screen.getByLabelText(/new password/i);
      confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      resetPasswordButton = screen.getByRole('button', { name: /reset password/i });

      userEvent.type(passwordInput, password);
      userEvent.type(confirmPasswordInput, password);
      fireEvent.click(resetPasswordButton);

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalled();
        const successNotification = screen.getByRole('heading', { name: /password reset successfully/i });
        expect(successNotification).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(history.location.pathname).toBe(LOGIN_ROUTE);
      }, {
        timeout: 4000,
      });
    });
  });
});
