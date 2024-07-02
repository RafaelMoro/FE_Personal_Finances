import { ReactNode } from 'react';
import { Typography } from '@mui/material';

import { MessageContainer } from '../../../styles/LoginModule.styled';
import { AppIcon } from '../Icons';

interface ErrorProps {
  title?: string;
  description: string;
  children?: ReactNode;
  hideIcon?: boolean;
}

const Error = ({
  title, description, children, hideIcon = false,
}: ErrorProps) => (
  <MessageContainer>
    { !hideIcon && (<AppIcon icon="Error" size="4.5rem" />) }
    { title && (<Typography>{title}</Typography>) }
    <Typography>{description}</Typography>
    { children }
  </MessageContainer>
);

export { Error };
