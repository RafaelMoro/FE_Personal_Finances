import { ErrorOutlineOutlined } from '@mui/icons-material';
import { Paragraph, AppColors } from '../../../styles';
import { MessageContainer } from '../../../styles/LoginModule.styled';
import { IErrorProps } from './interface';

const { negative } = AppColors;

const Error = ({ title, description, children }: IErrorProps) => (
  <MessageContainer>
    <ErrorOutlineOutlined sx={{ fontSize: '4.5rem', fill: negative }} />
    { title && (<Paragraph>{title}</Paragraph>) }
    <Paragraph>{description}</Paragraph>
    { children }
  </MessageContainer>
);

export { Error };
