import { useState, useEffect } from 'react';
import { WindowSizeValues } from '../aliasType';

/**
 * To use this hook, use the component: BackToTopButton.
 * Use conditional rendering on the prop "visible" to show BackToTopButton
 * Pass down the function scrollToTopto the component.
*/

interface UseBackToTopButtonProps {
  windowSize: WindowSizeValues;
}

const useBackToTopButton = ({ windowSize }: UseBackToTopButtonProps) => {
  const [visible, setVisible] = useState(false);
  const recordBoxDiv = document.querySelector('#record-box') ?? document.documentElement;
  const isDesktop = windowSize === 'Desktop';

  const toggleVisible = () => {
    const scrolled = isDesktop
      ? recordBoxDiv.scrollTop
      : document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (isDesktop) {
      recordBoxDiv.addEventListener('scroll', toggleVisible);
    }
    window.addEventListener('scroll', toggleVisible);

    return () => {
      if (isDesktop) {
        recordBoxDiv.removeEventListener('scroll', toggleVisible);
      }
      window.removeEventListener('scroll', toggleVisible);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToTop = () => {
    if (windowSize === 'Desktop') {
      recordBoxDiv.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    visible,
    toggleVisible,
    scrollToTop,
  };
};

export { useBackToTopButton };
