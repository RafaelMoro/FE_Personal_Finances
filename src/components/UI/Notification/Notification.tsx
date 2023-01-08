/** @jsxImportSource @emotion/react */
import { CloseOutlined } from '@mui/icons-material';
import { useState, useEffect } from 'react';

import { SystemStateIcons } from './utils';
import { INotificationProps } from './interface';
import {
  NotificationWrapper, NotificationContainer,
  IconStatusContainer, NotificationTitle,
  NotificationDescription, IconCloseContainer, NotificationUIElementContainer,
} from './Notification.styled';
import { fadeIn, fadeOut } from '../../../styles/animations/fadeInOut';

const Notification = ({
  title, description, status, close, UIElement = null,
}: INotificationProps) => {
  const [toggleAnimation, setToggleAnimation] = useState<boolean>(true);
  const animation = toggleAnimation ? fadeIn : fadeOut;

  useEffect(() => {
    setTimeout(() => {
      setToggleAnimation(false);
    }, 1500);
  }, [animation, toggleAnimation]);

  const handleEndAnimation = ():void => {
    if (animation === fadeOut) close();
  };

  return (
    <NotificationWrapper>
      <NotificationContainer
        data-testid="notification-container"
        onAnimationEnd={handleEndAnimation}
        css={animation}
      >
        <IconStatusContainer>
          { SystemStateIcons[status] }
        </IconStatusContainer>
        <NotificationTitle>{title}</NotificationTitle>
        <NotificationDescription>{description}</NotificationDescription>
        { UIElement && (
          <NotificationUIElementContainer>
            {UIElement}
          </NotificationUIElementContainer>
        )}
        <IconCloseContainer onClick={close}>
          <CloseOutlined sx={{ fontSize: '2.5rem' }} />
        </IconCloseContainer>
      </NotificationContainer>
    </NotificationWrapper>
  );
};

export { Notification };
