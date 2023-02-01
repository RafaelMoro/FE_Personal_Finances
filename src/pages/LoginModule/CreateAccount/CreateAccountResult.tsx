import {
  ErrorOutlineOutlined, CheckCircleOutlineOutlined,
} from '@mui/icons-material';

import { IErrorCreateAccount, ICreateAccountResult, ILoadingCreateAccount } from './interface';
import { LOGIN_ROUTE } from '../constants';
import {
  AppColors, Paragraph, AnchorButton, PrimaryButton, SecondaryButton,
} from '../../../styles';
import { AnimateBox } from '../../../animations';
import { LoaderContainer, MessageContainer, AnchorContainer } from '../../../styles/LoginModule.styled';
import { Loader } from '../../../animations/Loader';

const {
  positive, negative,
} = AppColors;

const LoadingCreateAccount = ({ counterView, direction }: ILoadingCreateAccount) => {
  if (counterView !== 2) return null;
  return (
    <AnimateBox direction={direction}>
      <LoaderContainer>
        <Loader />
        <Paragraph>Your account is being created. Please wait...</Paragraph>
      </LoaderContainer>
    </AnimateBox>
  );
};

const SuccessCreateAccount = () => (
  <MessageContainer>
    <CheckCircleOutlineOutlined sx={{ fontSize: '4.5rem', fill: positive }} />
    <Paragraph>Your account has being created.</Paragraph>
    <AnchorButton padding="6rem 0 0 0" to={LOGIN_ROUTE}>
      <PrimaryButton variant="contained" size="medium">Go to Login</PrimaryButton>
    </AnchorButton>
  </MessageContainer>
);

const ErrorCreateAccount = ({ error, resetCounterView }: IErrorCreateAccount) => (
  <MessageContainer>
    <ErrorOutlineOutlined sx={{ fontSize: '4.5rem', fill: negative }} />
    <Paragraph>{error}</Paragraph>
    <AnchorContainer>
      <AnchorButton to={LOGIN_ROUTE}>
        <SecondaryButton variant="contained" size="medium">Go to Login</SecondaryButton>
      </AnchorButton>
      <PrimaryButton variant="contained" onClick={() => resetCounterView()} size="medium">Try Again</PrimaryButton>
    </AnchorContainer>
  </MessageContainer>
);

const CreateAccountResult = ({
  isError, onError, onSuccess, direction, counterView,
}: ICreateAccountResult) => {
  if (counterView !== 3) return null;
  return (
    <AnimateBox direction={direction}>
      {isError && onError()}
      {!isError && onSuccess()}
    </AnimateBox>
  );
};

export {
  CreateAccountResult, SuccessCreateAccount, ErrorCreateAccount, LoadingCreateAccount,
};
