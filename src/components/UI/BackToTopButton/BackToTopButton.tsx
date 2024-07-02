import { AppIcon } from '../Icons';
import { IconButtonBackToTop } from './BackToTopButton.styled';

interface BackToTopButtonProps {
  scrollToTop: () => void;
}

/**
 * To use this component, use the hook: useBackToTopButton.
*/

const BackToTopButton = ({ scrollToTop }: BackToTopButtonProps) => (
  <IconButtonBackToTop onClick={scrollToTop}>
    <AppIcon icon="GoToTop" />
  </IconButtonBackToTop>
);

export { BackToTopButton };
