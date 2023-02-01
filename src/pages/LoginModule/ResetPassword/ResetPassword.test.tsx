/* eslint-disable no-console */
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { ResetPassword } from './ResetPassword';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  // having console error because of formik.
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('<ResetPassword />', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <ResetPassword />
      </Router>,
    );
  });
  test('Render Reset Password page', () => {
    expect(screen.getByRole('heading', { name: /reset password/i })).toBeInTheDocument();
    expect(screen.getByText(/enter your new password in the fields below:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
  });

  describe('Validations of the inputs form and submit form', () => {
    let passwordInput: HTMLElement | null = null;
    let confirmPasswordInput: HTMLElement | null = null;
    let resetPasswordButton: HTMLElement | null = null;
    let errorMessage: HTMLElement | null = null;
    let textForPasswordInput: string | null = null;

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

    test('Type 8 characters, 1 capital letter, 1 number and click button. Return error message to include at least 1 special character', async () => {
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

    test('Type 8 characters, 1 capital letter, 1 number, 1 special character, a space and click button. Return error message to do not include white spaces', async () => {
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

    test('Submit the form and have a successfully return', async () => {
      const password = 'MiContraseña2022!';
      passwordInput = screen.getByLabelText(/new password/i);
      confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      resetPasswordButton = screen.getByRole('button', { name: /reset password/i });

      mockedAxios.post.mockResolvedValue({
        response: 'password reset successfully',
      });

      userEvent.type(passwordInput, password);
      userEvent.type(confirmPasswordInput, password);
      fireEvent.click(resetPasswordButton);

      await waitFor(() => {
        // eslint-disable-next-line no-restricted-globals
        expect(location.pathname).toBe('/');
        expect(axios.post).toHaveBeenCalled();
      });
    });

    test('Submit the form and have a unsuccessful return', async () => {
      const password = 'MiContraseña2022!';
      passwordInput = screen.getByLabelText(/new password/i);
      confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      resetPasswordButton = screen.getByRole('button', { name: /reset password/i });

      mockedAxios.post.mockRejectedValue({
        message: 'JWT Expired',
        error: 'Bad Request',
        statusCode: 400,
      });

      userEvent.type(passwordInput, password);
      userEvent.type(confirmPasswordInput, password);
      fireEvent.click(resetPasswordButton);

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalled();
      });
    });
  });
});