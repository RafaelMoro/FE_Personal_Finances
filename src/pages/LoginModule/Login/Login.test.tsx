import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

import { Login } from './Login';
import { WrapperRedux } from '../../../tests/WrapperRedux';
import { DASHBOARD_ROUTE, REGISTER_ROUTE } from '../../RoutesConstants';

const credentials = {
  email: 'example@mail.com',
  password: 'example123',
};
const successfulLoginResponse = {
  version: '2.0.0',
  success: true,
  message: null,
  data: {
    accessToken: 'accessToken-sample',
    user: {
      _id: 'some-id',
      email: 'johndoe@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      middleName: '',
      __v: 0,
    },
  },
  error: null,
};

describe('<Login />', () => {
  const history: MemoryHistory = createMemoryHistory();
  beforeEach(() => {
    fetchMock.resetMocks();
    render(
      <WrapperRedux>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </WrapperRedux>,
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

  test.skip('Submit the form and have a unsuccessful return', async () => {
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Mock the rejected value response

    userEvent.type(emailInput, credentials.email);
    userEvent.type(passwordInput, credentials.password);
    userEvent.click(loginButton);

    await waitFor(() => {
      // expect the mock to be called.
    });
  });

  test.skip('Show notification error when email and password are incorrect', async () => {
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Mock the rejected value response

    userEvent.type(emailInput, credentials.email);
    userEvent.type(passwordInput, credentials.password);
    userEvent.click(loginButton);

    await waitFor(() => {
      const errorNotification = screen.getByRole('heading', { name: /error/i });
      expect(errorNotification).toBeInTheDocument();
    });
  });
});

describe('Test Login re routes', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  test('Click the button Register and redirect into the register route', async () => {
    const history: MemoryHistory = createMemoryHistory();
    render(
      <WrapperRedux>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </WrapperRedux>,
    );
    const registerLink = screen.getByRole('link', { name: /register/i });

    fireEvent.click(registerLink);

    await waitFor(() => {
      expect(history.location.pathname).toBe(REGISTER_ROUTE);
    }, {
      timeout: 4000,
    });
  });

  test('Submit the form and have a successful return', async () => {
    const history: MemoryHistory = createMemoryHistory();
    fetchMock.mockResponseOnce(JSON.stringify(successfulLoginResponse));
    render(
      <WrapperRedux>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </WrapperRedux>,
    );
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, credentials.email);
    userEvent.type(passwordInput, credentials.password);
    userEvent.click(loginButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      // Expect to see the tick in the button after successful login
      expect(screen.getByTestId('DoneOutlinedIcon')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(history.location.pathname).toBe(DASHBOARD_ROUTE);
    }, {
      timeout: 4000,
    });
  });
});
