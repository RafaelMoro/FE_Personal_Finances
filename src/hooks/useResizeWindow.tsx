import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { updateWindowSize as updateWindowSizeRedux } from '../redux/slices/userInterface.slice';
import { WindowSizeValues } from '../aliasType';

export function useResizeWindow() {
  const dispatch = useDispatch();
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);

  useEffect(() => {
    const updateWindowSize = () => {
      const width = window.innerWidth;
      let newDevice: WindowSizeValues = 'Mobile';

      if (width < 480) {
        newDevice = 'Mobile';
      } else if (width >= 480 && width <= 1024) {
        newDevice = 'Tablet';
      } else {
        newDevice = 'Desktop';
      }

      if (newDevice !== windowSize) dispatch(updateWindowSizeRedux(newDevice));
    };

    updateWindowSize();
    const handleResize = () => updateWindowSize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, windowSize]);
}
