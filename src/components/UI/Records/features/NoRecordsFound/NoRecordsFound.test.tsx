import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { NoRecordsFound } from './NoRecordsFound';

describe('<NoRecordsFound />', () => {
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
});
