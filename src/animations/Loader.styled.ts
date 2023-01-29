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

  div:nth-child(1) {
    left: 8px;
    ${ldsEllipsis1}
  }

  div:nth-child(2) {
    left: 8px;
    ${ldsEllipsis2}
  }

  div:nth-child(3) {
    left: 32px;
    ${ldsEllipsis2}
  }

  div:nth-child(4) {
    left: 56px;
    ${ldsEllipsis3}
  }
`;
