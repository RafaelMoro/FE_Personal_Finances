/** @jsxImportSource @emotion/react */
import { CloseOutlined } from '@mui/icons-material';

import { SystemStateIcons } from './utils';
import { INotificationProps } from './interface';
import {
  NotificationWrapper, NotificationContainer,
  IconStatusContainer, NotificationTitle,
  NotificationDescription, IconCloseContainer,
} from './Notification.styled';
import { fadeIn } from '../../../styles/animations/fadeInOut';

const Notification = ({
  title, description, status, close,
}: INotificationProps) => (
  <NotificationWrapper>
    <NotificationContainer css={fadeIn}>
      <IconStatusContainer>
        { SystemStateIcons[status] }
      </IconStatusContainer>
      <NotificationTitle>{title}</NotificationTitle>
      <NotificationDescription>{description}</NotificationDescription>
      <IconCloseContainer onClick={close}>
        <CloseOutlined sx={{ fontSize: '2.5rem' }} />
      </IconCloseContainer>
    </NotificationContainer>
  </NotificationWrapper>
);

export { Notification };
