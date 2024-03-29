import styled from '@emotion/styled';
import { responsiveBreakpoints } from '../../../styles';

export const SpeedDialContainer = styled.div`
  position: fixed;
  bottom: 1.6rem;
  right: 1.6rem;
  transform: translateZ(0px);

  @media ${responsiveBreakpoints.desktop} {
    position: absolute;
  }
`;
