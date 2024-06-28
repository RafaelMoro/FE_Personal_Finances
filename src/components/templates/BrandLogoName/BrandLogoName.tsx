import { useNavigate } from 'react-router-dom';

import { BrandLogoNameProps } from './interface';
import { BrandLogoButton, LogoImageContainer, LogoTitleLogin } from './BrandLogoName.styled';
import logoWebp from '../../../assets/logo-webp.webp';
import logoPng from '../../../assets/logo-png.png';
import { LANDING_ROUTE } from '../../../pages/RoutesConstants';

const BrandLogoName = ({ isLandingPage = false, isLoginPage = false }: BrandLogoNameProps) => {
  const navigate = useNavigate();
  const titleVariant = isLoginPage ? 'h1' : 'h2';
  const navigateHome = () => navigate(LANDING_ROUTE);

  return (
    <BrandLogoButton type="button" onClick={navigateHome} isLoginPage={isLoginPage}>
      <LogoImageContainer isLandingPage={isLandingPage} isLoginPage={isLoginPage}>
        <source srcSet={logoWebp} type="image/webp" />
        <img src={logoPng} alt="Budget Master logo" />
      </LogoImageContainer>
      <LogoTitleLogin isLandingPage={isLandingPage} variant={titleVariant}>Budget Master</LogoTitleLogin>
    </BrandLogoButton>
  );
};

export { BrandLogoName };
