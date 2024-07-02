import { render, screen } from '@testing-library/react';
import { LoadingStatus } from './LoadingStatus';

describe('<LoadingStatus />', () => {
  test('Show a loading spinner and a text', () => {
    render(<LoadingStatus text="Loading" />);

    expect(screen.getByTestId('horizontal-loader')).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
