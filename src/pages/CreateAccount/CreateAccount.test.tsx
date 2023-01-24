import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { CreateAccount } from './CreateAccount';

beforeEach(() => {
  // having console error because of formik.
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('<CreateAccount />', () => {
  test('Render create account page with title, description, inputs and button', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <CreateAccount />
      </Router>,
    );
    const firstNameInput = screen.getByRole('textbox', { name: /first name/i });

    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByText(/fill the following information to create your account\./i)).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });
});
