import { screen, render, waitFor } from '@testing-library/react';

import { Notification } from './Notification';
import { SystemStateEnum } from '../../../enums';

describe('<Notification />', () => {
  beforeEach(() => {
    const closeNotification = jest.fn();
    render(<Notification title="My title" description="Description of my notification component" status={SystemStateEnum.Success} close={closeNotification} />);
  });

  test('Render Notification component with a title and description', () => {
    expect(screen.queryByText('My title')).toBeInTheDocument();
    expect(screen.queryByText('Description of my notification component')).toBeInTheDocument();
  });

  test('Render Notification starting with fade in animation', () => {
    const notification = screen.queryByTestId('notification-container');

    expect(notification).toHaveClass('css-cgfjxi-fadeInAnimation');
  });

  test('Render notification and after 1.5 seconds, have fadeOut Animation', async () => {
    const notification = screen.queryByTestId('notification-container');

    await waitFor(() => {
      expect(notification).toHaveClass('css-bwbv71-fadeOutAnimation');
    }, { timeout: 1600 });
  });
});

test('Render Notification component with error state icon', () => {
  const closeNotification = jest.fn();
  render(<Notification title="Any title" description="Any description" status={SystemStateEnum.Error} close={closeNotification} />);

  expect(screen.queryByTestId('ErrorOutlineOutlinedIcon')).toBeInTheDocument();
});
