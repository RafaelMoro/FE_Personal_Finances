import { CloseOutlined } from '@mui/icons-material';

import { SystemStateIcons } from './utils';
import { INotificationProps } from './interface';
import {
  NotificationWrapper, NotificationContainer,
  IconStatusContainer, NotificationTitle,
  NotificationDescription, IconCloseContainer,
} from './Notification.styled';

const Notification = ({ title, description, status }: INotificationProps) => (
  <NotificationWrapper>
    <NotificationContainer>
      <IconStatusContainer>
        { SystemStateIcons[status] }
      </IconStatusContainer>
      <NotificationTitle>{title}</NotificationTitle>
      <NotificationDescription>{description}</NotificationDescription>
      <IconCloseContainer>
        <CloseOutlined sx={{ fontSize: '2.5rem' }} />
      </IconCloseContainer>
    </NotificationContainer>
  </NotificationWrapper>
);

export { Notification };
