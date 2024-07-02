import { render, screen } from '@testing-library/react';
import { RecordLoading } from './RecordLoading';

describe('<RecordLoading />', () => {
  test('Show record loading skeleton', () => {
    render(<RecordLoading />);

    expect(screen.getByTestId('record-loading-skeleton')).toBeInTheDocument();
  });
});
