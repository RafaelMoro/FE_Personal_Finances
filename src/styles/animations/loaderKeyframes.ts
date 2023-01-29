import { css, keyframes } from '@emotion/react';

export const ldsEllipsis1Keyframe = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

export const ldsEllipsis2Keyframe = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

export const ldsEllipsis3Keyframe = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

export const ldsEllipsis1 = css`
  animation: ${ldsEllipsis1Keyframe} 0.6s infinite;
  label: ldsEllipsis1Animation;
`;

export const ldsEllipsis2 = css`
  animation: ${ldsEllipsis2Keyframe} 0.6s infinite;
  label: ldsEllipsis2Animation;
`;

export const ldsEllipsis3 = css`
  animation: ${ldsEllipsis3Keyframe} 0.6s infinite;
  label: ldsEllipsis3Animation;
`;
