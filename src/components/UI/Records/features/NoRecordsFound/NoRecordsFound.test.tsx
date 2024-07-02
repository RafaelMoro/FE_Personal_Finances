import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import userEvent from '@testing-library/user-event';
import { NoRecordsFound } from './NoRecordsFound';
import { CREATE_RECORD_ROUTE } from '../../../../../pages/RoutesConstants';

describe('<NoRecordsFound />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  const history = createMemoryHistory();
  test('Show no records found with a text, image and a button', () => {
    render(
      <Router location={history.location} navigator={history}>
        <NoRecordsFound />
      </Router>,
    );

    expect(screen.getByText(/You have not created records for this month./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create record/i })).toBeInTheDocument();
    expect(screen.getByAltText(/No Records Found/i)).toBeInTheDocument();
  });

  test('Click the create records button and navigate into create record page', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <NoRecordsFound />
      </Router>,
    );

    const button = screen.getByRole('button', { name: /create record/i });
    userEvent.click(button);

    await waitFor(() => {
      expect(history.location.pathname).toBe(CREATE_RECORD_ROUTE);
    });
  });
});
