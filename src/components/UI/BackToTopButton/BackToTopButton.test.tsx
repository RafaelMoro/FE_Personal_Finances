import { render, screen } from '@testing-library/react';
import { BackToTopButton } from './BackToTopButton';

test('Show Back to top Button component', () => {
  const scrollToTop = jest.fn();
  render(<BackToTopButton scrollToTop={scrollToTop} />);

  expect(screen.getByTestId('KeyboardArrowUpOutlinedIcon')).toBeInTheDocument();
});
