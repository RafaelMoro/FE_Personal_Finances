import { WindowSizeValues } from '../aliasType';
import { GlobalNotification } from '../globalInterface';

export interface UserInterfaceInitialState {
  notification: GlobalNotification;
  windowSize: WindowSizeValues;
  hasSignedOn: boolean;
}
