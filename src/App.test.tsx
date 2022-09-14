import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

test('Render the login page as Home', () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>,
  );

  expect(history.location.pathname).toBe('/');
});
