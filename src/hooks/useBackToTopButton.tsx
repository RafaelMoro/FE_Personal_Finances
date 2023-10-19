import { useState, useEffect } from 'react';

/**
 * To use this hook, use the component: BackToTopButton.
 * Use conditional rendering on the prop "visible" to show BackToTopButton
 * Pass down the function scrollToTopto the component.
*/

const useBackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);

    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  const scrollToTop = () => {
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
