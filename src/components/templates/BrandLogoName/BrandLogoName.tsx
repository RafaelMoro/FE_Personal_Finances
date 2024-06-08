import { BrandLogoNameProps } from './interface';
import { LogoImageContainer, LogoTitleLogin } from './BrandLogoName.styled';
import logoWebp from '../../../assets/logo-webp.webp';
import logoPng from '../../../assets/logo-png.png';

const BrandLogoName = ({ isLandingPage = false, isLoginPage = false }: BrandLogoNameProps) => {
  const titleVariant = isLoginPage ? 'h1' : 'h2';
  return (
    <>
      <LogoImageContainer isLandingPage={isLandingPage} isLoginPage={isLoginPage}>
        <source srcSet={logoWebp} type="image/webp" />
        <img src={logoPng} alt="Budget Master logo" />
      </LogoImageContainer>
      <LogoTitleLogin isLandingPage={isLandingPage} variant={titleVariant}>Budget Master</LogoTitleLogin>
    </>
  );
};

export { BrandLogoName };
