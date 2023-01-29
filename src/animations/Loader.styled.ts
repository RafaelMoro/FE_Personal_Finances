import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { AppColors } from '../styles';
import { ldsEllipsis1, ldsEllipsis2, ldsEllipsis3 } from '../styles/animations/loaderKeyframes';

export const LoaderStyled = styled(motion.div)`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);

  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${AppColors.primary};
  }

  div:nth-of-type(1) {
    left: 8px;
    ${ldsEllipsis1}
  }

  div:nth-of-type(2) {
    left: 8px;
    ${ldsEllipsis2}
  }

  div:nth-of-type(3) {
    left: 32px;
    ${ldsEllipsis2}
  }

  div:nth-of-type(4) {
    left: 56px;
    ${ldsEllipsis3}
  }
`;
