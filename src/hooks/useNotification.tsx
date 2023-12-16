import { useRef, useState } from 'react';

import { SystemStateEnum } from '../enums';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  updateNotificationTitle as updateTitleSlice,
  updateNotificationDescription as updateDescriptionSlice,
  updateNotificationStatus as updateStatusSlice,
  toggleNotification as toggleNotificationSlice,
} from '../redux/slices/userInterface.slice';

interface UseNotificationProps {
  title?: string;
  description?: string;
  status?: SystemStateEnum;
}

interface UpdateGlobalNotificationProps {
  newTitle: string;
  newDescription: string;
  newStatus: SystemStateEnum;
}

/*
* useNotification manages when to show or hide the notification, what title, description
* and status should the component have.
*
* This hook recieves the props: title, description and status. Same as the notification component
* It returns:
*   - showNotification: flag to show or hide notification
*   - notificationInfo: is a react Ref that have title, description and status of the notification.
*   - toggleShowNotification: Function that toggles the showNotification flag.
*   - updateTitle: Function that updates the notification title.
*   - updateDescription: Function that updates the notification description.
*   - updateStatus: Function that updates the notification status.
*/
const useNotification = ({ title = '', description = '', status = SystemStateEnum.Info }: UseNotificationProps = {}) => {
  const dispatch = useAppDispatch();
  const globalNotification = useAppSelector((state) => state.userInterface.notification);
  const [localNotification, setLocalNotification] = useState<boolean>(false);
  const notificationInfo = useRef({
    title,
    description,
    status,
  });

  const toggleShowNotification = () => {
    setLocalNotification((prevState) => !prevState);
  };

  const showNotification = () => setLocalNotification(true);
  const hideNotification = () => setLocalNotification(false);

  const updateTitle = (newTitle: string):void => {
    notificationInfo.current.title = newTitle;
  };

  const updateDescription = (newDescription: string):void => {
    notificationInfo.current.description = newDescription;
  };

  const updateStatus = (newStatus: SystemStateEnum):void => {
    notificationInfo.current.status = newStatus;
  };

  function updateGlobalTitle(newTitle: string):void {
    dispatch(updateTitleSlice(newTitle));
  }

  function updateGlobalDescription(newDescription: string):void {
    dispatch(updateDescriptionSlice(newDescription));
  }

  function updateGlobalStatus(newStatus: SystemStateEnum):void {
    dispatch(updateStatusSlice(newStatus));
  }

  function updateGlobalNotification({ newTitle, newDescription, newStatus }: UpdateGlobalNotificationProps):void {
    dispatch(updateTitleSlice(newTitle));
    dispatch(updateDescriptionSlice(newDescription));
    dispatch(updateStatusSlice(newStatus));
    dispatch(toggleNotificationSlice());
  }

  function toggleGlobalNotification() {
    dispatch(toggleNotificationSlice());
  }

  return {
    notification: localNotification,
    notificationInfo,
    toggleShowNotification,
    showNotification,
    hideNotification,
    updateTitle,
    updateDescription,
    updateStatus,
    globalNotification,
    updateGlobalTitle,
    updateGlobalDescription,
    updateGlobalStatus,
    updateGlobalNotification,
    toggleGlobalNotification,
  };
};

export { useNotification };
