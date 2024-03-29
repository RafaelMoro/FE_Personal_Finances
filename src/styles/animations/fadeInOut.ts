import { css, keyframes } from '@emotion/react';

export const fadeInKeyframe = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const fadeOutKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const fadeIn = css`
  animation: ${fadeInKeyframe} 1s ease;
  label: fadeInAnimation;
`;

export const fadeOut = css`
  animation: ${fadeOutKeyframe} 3s ease;
  animation-fill-mode: forwards;
  label: fadeOutAnimation;
`;
