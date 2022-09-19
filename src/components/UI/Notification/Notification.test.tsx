import { screen, render } from '@testing-library/react';

import { Notification } from './Notification';
import { SystemStateEnum } from '../../../enums';

describe('<Notification />', () => {
  test('Render Notification component with a title and description', () => {
    render(<Notification title="My title" description="Description of my notification component" status={SystemStateEnum.Success} />);

    expect(screen.queryByText('My title')).toBeInTheDocument();
    expect(screen.queryByText('Description of my notification component')).toBeInTheDocument();
  });

  test('Render Notification component with error state', () => {
    render(<Notification title="Any title" description="Any description" status={SystemStateEnum.Error} />);

    expect(screen.queryByTestId('ErrorOutlineOutlinedIcon')).toBeInTheDocument();
  });
});
