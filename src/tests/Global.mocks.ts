import { WindowSizeValues } from '../aliasType';
import { SystemStateEnum } from '../enums';
import { UserInterfaceInitialState } from '../redux/interface';

export const getInitialUserInterfaceState = ({ newWindowSize }: { newWindowSize: WindowSizeValues }): UserInterfaceInitialState => ({
  notification: {
    title: '',
    description: '',
    status: SystemStateEnum.Info,
    showNotification: false,
  },
  windowSize: newWindowSize,
  hasSignedOn: false,
});
