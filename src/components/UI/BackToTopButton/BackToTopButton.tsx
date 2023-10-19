import { GoToTopIcon } from '../Icons';
import { IconButtonBackToTop } from './BackToTopButton.styled';
import { BackToTopButtonProps } from './interface';

/**
 * To use this component, use the hook: useBackToTopButton.
*/

const BackToTopButton = ({ scrollToTop }: BackToTopButtonProps) => (
  <IconButtonBackToTop onClick={scrollToTop}>
    <GoToTopIcon />
  </IconButtonBackToTop>
);

export { BackToTopButton };
