import { Typography } from '@mui/material';
import { FlexContainer } from '../../../../../styles';
import { HorizontalLoader } from '../../../HorizontalLoader';

interface LoadingStatusProps {
  text: string
}

const LoadingStatus = ({ text }: LoadingStatusProps) => (
  <FlexContainer justifyContent="center" alignItems="center" gap={4} flexDirection="column">
    <HorizontalLoader />
    <Typography variant="body2">{text}</Typography>
  </FlexContainer>
);

export { LoadingStatus };
