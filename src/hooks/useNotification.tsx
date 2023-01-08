import { useAtom } from 'jotai';
import { showNotificationAtom } from '../atoms';

const useNotification = () => {
  const [showNotification, setShowNotification] = useAtom(showNotificationAtom);

  const toggleShowNotification = () => {
    setShowNotification((prevState) => !prevState);
  };

  return { showNotification, toggleShowNotification };
};

export { useNotification };
