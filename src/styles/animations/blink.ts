import { css, keyframes } from '@emotion/react';

export const blinkKeyframe = keyframes`
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.4;
  }
`;

export const blinkAnimation = css`
  animation: ${blinkKeyframe} 1s infinite ease-out;
  label: blinkAnimation;
`;
