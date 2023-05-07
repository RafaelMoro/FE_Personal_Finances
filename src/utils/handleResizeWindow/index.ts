import { WindowSizeValues } from '../../aliasType';

export function handleResizeWindow(event: UIEvent) {
  const target = event.target as Window;
  let windowSize: WindowSizeValues = 'Mobile';

  if (target.innerWidth < 480) {
    windowSize = 'Mobile';
    return windowSize;
  }

  if (target.innerWidth > 480 && target.innerWidth < 1024) {
    windowSize = 'Tablet';
    return windowSize;
  }

  if (target.innerWidth > 1024) {
    windowSize = 'Desktop';
    return windowSize;
  }

  return windowSize;
}
