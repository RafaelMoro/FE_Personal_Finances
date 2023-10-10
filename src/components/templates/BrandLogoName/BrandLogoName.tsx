import { BrandLogoNameProps } from './interface';
import { LogoImageContainer, LogoTitleLogin, LogoTitleHeader } from './BrandLogoName.styled';
import logoWebp from '../../../assets/logo-webp.webp';
import logoPng from '../../../assets/logo-png.png';

const BrandLogoName = ({ isLoginPage = false }: BrandLogoNameProps) => {
  const Title = isLoginPage ? LogoTitleLogin : LogoTitleHeader;
  return (
    <>
      <LogoImageContainer isLoginPage={isLoginPage}>
        <source srcSet={logoWebp} type="image/webp" />
        <img src={logoPng} alt="Budget Master logo" />
      </LogoImageContainer>
      <Title>Budget Master</Title>
    </>
  );
};

export { BrandLogoName };
