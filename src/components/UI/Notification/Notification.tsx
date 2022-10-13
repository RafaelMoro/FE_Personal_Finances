/* eslint-disable no-console */
/** @jsxImportSource @emotion/react */
import { CloseOutlined } from '@mui/icons-material';
import { useState, useEffect } from 'react';

import { SystemStateIcons } from './utils';
import { INotificationProps } from './interface';
import {
  NotificationWrapper, NotificationContainer,
  IconStatusContainer, NotificationTitle,
  NotificationDescription, IconCloseContainer,
} from './Notification.styled';
import { fadeIn, fadeOut } from '../../../styles/animations/fadeInOut';

const Notification = ({
  title, description, status, close,
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
        onAnimationEnd={handleEndAnimation}
        css={animation}
      >
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
};

export { Notification };
