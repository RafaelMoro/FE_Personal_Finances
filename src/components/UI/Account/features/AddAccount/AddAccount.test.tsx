import { render, screen } from '@testing-library/react';
import { AddAccount } from './AddAccount';

describe('<AddAccount />', () => {
  test('Show AddAccount component with icon and title create account', () => {
    const onClickfn = jest.fn();
    render(<AddAccount onClick={onClickfn} />);
    expect(screen.getByTestId('AddOutlinedIcon')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });
});
