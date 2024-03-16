import { IconButton, Typography } from '@mui/material';

import { useLogin } from '../../../hooks/useLogin';
import { useAppSelector } from '../../../redux/hooks';
import {
  FlexContainer,
} from '../../../styles';
import { AppIcon } from '../../UI/Icons';
import { HeaderContainer, HeaderShadow } from './Header.styled';
import { BrandLogoName } from '../BrandLogoName';

const Header = () => {
  const { signOut } = useLogin();
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);

  return (
    <HeaderShadow>
      <HeaderContainer>
        <FlexContainer gap={2} alignItems="center">
          <BrandLogoName />
        </FlexContainer>
        { (windowSize === 'Desktop') && (<Typography variant="h3">Account management</Typography>) }
        <IconButton aria-label="sign-out-button" onClick={signOut}>
          <AppIcon icon="LogOut" />
        </IconButton>
      </HeaderContainer>
    </HeaderShadow>
  );
};

export { Header };
