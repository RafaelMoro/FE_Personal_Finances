import { render, screen } from '@testing-library/react';
import { HorizontalLoader } from './HorizontalLoader';

test('Show Horizontal Loader', () => {
  render(<HorizontalLoader />);

  expect(screen.getByTestId('horizontal-loader')).toBeInTheDocument();
});
