import { IconButton } from '@mui/material';
import { useAtom } from 'jotai';

import { useLogin } from '../../../hooks/useLogin';
import {
  FlexContainer, ParagraphTitle,
} from '../../../styles';
import { LogOutIcon } from '../../UI/Icons';
import { HeaderContainer, LogoImageContainer } from './Header.styled';
import { LogoTitle } from '../../../pages/LoginModule/Login/Login.styled';
import logoWebp from '../../../assets/logo-webp.webp';
import logoPng from '../../../assets/logo-png.png';
import { windowSizeAtom } from '../../../atoms';

const Header = () => {
  const { signOut } = useLogin();
  const [windowSize] = useAtom(windowSizeAtom);

  return (
    <HeaderContainer>
      <FlexContainer gap="3" alignItems="center">
        <LogoImageContainer>
          <source srcSet={logoWebp} type="image/webp" />
          <img src={logoPng} alt="Budget Master logo" />
        </LogoImageContainer>
        <LogoTitle>Budget Master</LogoTitle>
      </FlexContainer>
      { (windowSize === 'Desktop') && (<ParagraphTitle>Account management</ParagraphTitle>) }
      <IconButton onClick={signOut}>
        <LogOutIcon />
      </IconButton>
    </HeaderContainer>
  );
};

export { Header };
