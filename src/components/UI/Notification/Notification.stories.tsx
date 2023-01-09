import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Notification } from './Notification';
import { PrimaryButton } from '../../../styles';
import { SystemStateEnum } from '../../../enums';

const myButton = <PrimaryButton variant="contained" size="medium">Click me!</PrimaryButton>

export default {
  title: 'UI/Notification',
  component: Notification
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => <Notification {...args} />;

const mockCloseNotification = () => {}

export const SuccessNotification = Template.bind({});
SuccessNotification.args = {
  title: 'Success Notification',
  description: 'This is a success notification',
  status: SystemStateEnum.Success,
  close: mockCloseNotification,
};

export const ErrorNotification = Template.bind({});
ErrorNotification.args = {
  title: 'An error ocurred',
  description: 'Something bad happened, please try again later',
  status: SystemStateEnum.Error,
  close: mockCloseNotification,
}

export const WarningNotification = Template.bind({});
WarningNotification.args = {
  title: 'Be careful',
  description: 'Are you sure you want to continue?',
  status: SystemStateEnum.Warning,
  close: mockCloseNotification,
}

export const InfoNotification = Template.bind({});
InfoNotification.args = {
  title: 'This is a informative notification',
  description: 'Your action has been carried out.',
  status: SystemStateEnum.Info,
  close: mockCloseNotification,
}

export const LongTextNotification = Template.bind({});
LongTextNotification.args = {
  title: 'This is a informative notification',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae sunt architecto distinctio velit, id consequatur? Iste sit nostrum incidunt consectetur repudiandae accusantium totam cupiditate temporibus quaerat! Dolorem, optio assumenda. Voluptatem?,',
  status: SystemStateEnum.Info,
  close: mockCloseNotification,
}

export const NotificationWithUIElement = Template.bind({});
NotificationWithUIElement.argTypes = {
  UIElement: {
    options: ['button'],
    mapping: {
      button: myButton
    },
    defaultValue: 'button'
  }
}
NotificationWithUIElement.args = {
  title: 'Hey',
  description: 'There is a button in this notification',
  status: SystemStateEnum.Info,
  close: mockCloseNotification,
}

