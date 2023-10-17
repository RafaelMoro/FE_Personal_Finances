import { useState, useEffect } from 'react';
import { GoToTopIcon } from '../Icons';
import { IconButtonBackToTop } from './BackToTopButton.styled';

const BackToTopButton = () => {
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

  return (
    <IconButtonBackToTop visible={visible} onClick={scrollToTop}>
      <GoToTopIcon />
    </IconButtonBackToTop>
  );
};

export { BackToTopButton };
