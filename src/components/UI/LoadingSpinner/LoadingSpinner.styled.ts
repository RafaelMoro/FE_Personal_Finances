import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const loadingSpinnerKeyframe = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
} 
`;

export const loadingSpinnerAnimation = css`
    animation: ${loadingSpinnerKeyframe} 1s linear infinite;
    label: loadingSpinnerAnimation;
`;

export const Spinner = styled.span`
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    ${loadingSpinnerAnimation}
`;
