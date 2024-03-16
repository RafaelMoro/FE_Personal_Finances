import { Typography } from '@mui/material';
import { MessageContainer } from '../../../styles/LoginModule.styled';
import { ErrorProps } from './interface';
import { AppIcon } from '../Icons';

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
