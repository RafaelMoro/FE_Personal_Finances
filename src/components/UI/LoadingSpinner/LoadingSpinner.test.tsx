import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

test('Show Loading spinner', () => {
  render(<LoadingSpinner />);
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});
