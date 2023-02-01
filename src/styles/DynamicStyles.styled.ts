import { css } from '@emotion/react';

interface IdynamicPadding {
  padding?: string;
}

export const dynamicPadding = ({ padding = '0' }: IdynamicPadding) => css`
  padding: ${padding}rem;
`;
