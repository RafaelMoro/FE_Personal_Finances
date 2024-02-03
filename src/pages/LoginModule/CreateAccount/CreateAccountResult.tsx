import { Typography } from '@mui/material';
import {
  CheckCircleOutlineOutlined,
} from '@mui/icons-material';

import { IErrorCreateAccount, ICreateAccountResult, ILoadingCreateAccount } from './interface';
import { LOGIN_ROUTE } from '../../RoutesConstants';
import { Error } from '../../../components/UI';
import { HorizontalLoader } from '../../../components/UI/HorizontalLoader';
import { AnimateBox } from '../../../animations';
import { LoaderContainer, MessageContainer, AnchorContainer } from '../../../styles/LoginModule.styled';
import {
  AppColors, AnchorButton, PrimaryButton, SecondaryButton,
} from '../../../styles';

const {
  positive,
} = AppColors;

const LoadingCreateAccount = ({ counterView, direction }: ILoadingCreateAccount) => {
  if (counterView !== 2) return null;
  return (
    <AnimateBox direction={direction}>
      <LoaderContainer>
        <HorizontalLoader />
        <Typography>Your account is being created. Please wait...</Typography>
      </LoaderContainer>
    </AnimateBox>
  );
};

const SuccessCreateAccount = () => (
  <MessageContainer>
    <CheckCircleOutlineOutlined sx={{ fontSize: '4.5rem', fill: positive }} />
    <Typography>Your account has being created.</Typography>
    <AnchorButton padding="6rem 0 0 0" to={LOGIN_ROUTE}>
      <PrimaryButton variant="contained" size="medium">Go to Login</PrimaryButton>
    </AnchorButton>
  </MessageContainer>
);

const ErrorCreateAccount = ({ error, resetCounterView }: IErrorCreateAccount) => (
  <Error description={error}>
    <AnchorContainer>
      <AnchorButton to={LOGIN_ROUTE}>
        <SecondaryButton variant="contained" size="medium">Go to Login</SecondaryButton>
      </AnchorButton>
      <PrimaryButton variant="contained" onClick={() => resetCounterView()} size="medium">Try Again</PrimaryButton>
    </AnchorContainer>
  </Error>
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
