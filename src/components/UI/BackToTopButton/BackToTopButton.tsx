import { GoToTopIcon } from '../Icons';
import { IconButtonBackToTop } from './BackToTopButton.styled';
import { BackToTopButtonProps } from './interface';

const BackToTopButton = ({ scrollToTop }: BackToTopButtonProps) => (
  <IconButtonBackToTop onClick={scrollToTop}>
    <GoToTopIcon />
  </IconButtonBackToTop>
);

export { BackToTopButton };
