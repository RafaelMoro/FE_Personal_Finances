import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { ForgotPassword } from './ForgotPassword';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  // having console error because of formik.
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('<ResetPassword />', () => {
  test('Render Forgot Password page with title, description, input and button', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <ForgotPassword />
      </Router>,
    );

    expect(screen.getByRole('heading', { name: /forgot password/i })).toBeInTheDocument();
    expect(screen.getByText(/please enter your email and we will send you the instructions to reset your password\./i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /change my password/i })).toBeInTheDocument();
  });

  describe('Validations of the input and submit form', () => {
    let emailInput: HTMLElement | null = null;
    let changePasswordButton: HTMLElement | null = null;

    beforeEach(() => {
      const history = createMemoryHistory();
      render(
        <Router location={history.location} navigator={history}>
          <ForgotPassword />
        </Router>,
      );
    });

    test('If the email input is empty and the button is clicked, a validation error must appear', async () => {
      emailInput = screen.getByRole('textbox', { name: /email/i });
      changePasswordButton = screen.getByRole('button', { name: /change my password/i });

      fireEvent.click(changePasswordButton);

      await waitFor(() => {
        expect(emailInput).toBeInTheDocument();
        const error = screen.getByText(/email is required/i);
        expect(error).toBeInTheDocument();
      });
    });

    test('If the email entered is invalid and the submit button is clicked, a validation error must appear', async () => {
      emailInput = screen.getByRole('textbox', { name: /email/i });
      changePasswordButton = screen.getByRole('button', { name: /change my password/i });

      userEvent.type(emailInput, 'a');
      fireEvent.click(changePasswordButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      });
    });

    // This form will always return successfull return due user security.
    test('Submit the form and have a successful return', async () => {
      const email = 'example@mail.com';
      emailInput = screen.getByRole('textbox', { name: /email/i });
      changePasswordButton = screen.getByRole('button', { name: /change my password/i });

      mockedAxios.post.mockResolvedValue({
        response: 'email sent',
      });

      userEvent.type(emailInput, email);
      userEvent.click(changePasswordButton);

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalled();
      });
    });
  });
});
