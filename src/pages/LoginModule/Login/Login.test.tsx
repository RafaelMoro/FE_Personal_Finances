import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { Login } from './Login';

const credentials = {
  email: 'example@mail.com',
  password: 'example123',
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('<Login />', () => {
  const history: MemoryHistory = createMemoryHistory();
  beforeEach(() => {
    render(
      <Router location={history.location} navigator={history}>
        <Login />
      </Router>,
    );
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test("Render Login Page with the title 'welcome back', email and password input and login button", () => {
    const title = screen.getByRole('heading', { name: /welcome back/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    const registerButton = screen.getByRole('button', { name: /register/i });
    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test('If the email and password input are empty, a validation error must appear in each input', async () => {
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('If the email input has an invalid email, a validation error must appear in each input', async () => {
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const loginButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'a');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  test('Click the button Register and redirect into the register route', async () => {
    const registerLink = screen.getByRole('link', { name: /register/i });

    fireEvent.click(registerLink);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/register');
    }, {
      timeout: 4000,
    });
  });

  test('Submit the form and have a successful return', async () => {
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    mockedAxios.post.mockResolvedValue({
      data: {
        accessToken: 'mockedAccessToken',
        user: {
          email: credentials.email,
          _v: 0,
          _id: 'mockedId',
        },
      },
    });

    userEvent.type(emailInput, credentials.email);
    userEvent.type(passwordInput, credentials.password);
    userEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  test('Submit the form and have a unsuccessful return', async () => {
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    mockedAxios.post.mockRejectedValue({
      response: {
        data: {
          error: 'Unauthorized',
          message: 'Email or Password incorrect',
          statusCode: 401,
        },
      },
    });

    userEvent.type(emailInput, credentials.email);
    userEvent.type(passwordInput, credentials.password);
    userEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  test('Show notification error when email and password are incorrect', async () => {
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    mockedAxios.post.mockRejectedValue({
      response: {
        data: {
          error: 'Unauthorized',
          message: 'Email or Password incorrect',
          statusCode: 401,
        },
      },
    });

    userEvent.type(emailInput, credentials.email);
    userEvent.type(passwordInput, credentials.password);
    userEvent.click(loginButton);

    await waitFor(() => {
      const errorNotification = screen.getByRole('heading', { name: /error/i });
      expect(errorNotification).toBeInTheDocument();
    });
  });
});
