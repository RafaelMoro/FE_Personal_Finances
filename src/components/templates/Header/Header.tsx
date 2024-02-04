import { IconButton, Typography } from '@mui/material';

import { useLogin } from '../../../hooks/useLogin';
import { useAppSelector } from '../../../redux/hooks';
import {
  FlexContainer,
} from '../../../styles';
import { LogOutIcon } from '../../UI/Icons';
import { HeaderContainer } from './Header.styled';
import { BrandLogoName } from '../BrandLogoName';

const Header = () => {
  const { signOut } = useLogin();
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);

  return (
    <HeaderContainer>
      <FlexContainer gap="3" alignItems="center">
        <BrandLogoName />
      </FlexContainer>
      { (windowSize === 'Desktop') && (<Typography variant="h3">Account management</Typography>) }
      <IconButton onClick={signOut}>
        <LogOutIcon />
      </IconButton>
    </HeaderContainer>
  );
};

export { Header };
