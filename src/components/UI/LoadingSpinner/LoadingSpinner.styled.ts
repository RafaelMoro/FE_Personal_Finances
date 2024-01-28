import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { SpinnerProps } from './interface';

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
    width: 2.4rem;
    height: 2.4rem;
    border: ${({ color, borderSize }: SpinnerProps) => (`${borderSize}rem solid ${color}`)};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    ${loadingSpinnerAnimation}
`;
