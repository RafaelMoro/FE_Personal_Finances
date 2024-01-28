import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { AppColors } from '../styles';
import { ldsEllipsis1, ldsEllipsis2, ldsEllipsis3 } from '../styles/animations/loaderKeyframes';

export const LoaderStyled = styled(motion.div)`
  display: inline-block;
  position: relative;
  width: 4rem;
  height: 4rem;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);

  div {
    position: absolute;
    top: 3.3rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${AppColors.primary};
  }

  div:nth-of-type(1) {
    left: 0.8rem;
    ${ldsEllipsis1}
  }

  div:nth-of-type(2) {
    left: 0.8rem;
    ${ldsEllipsis2}
  }

  div:nth-of-type(3) {
    left: 3.2rem;
    ${ldsEllipsis2}
  }

  div:nth-of-type(4) {
    left: 5.6rem;
    ${ldsEllipsis3}
  }
`;
