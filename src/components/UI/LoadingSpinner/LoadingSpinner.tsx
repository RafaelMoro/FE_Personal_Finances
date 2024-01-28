import { LoadingSpinnerProps } from './interface';
import { AppColors } from '../../../styles';
import { Spinner } from './LoadingSpinner.styled';

const LoadingSpinner = ({ color = AppColors.white, borderSize = '0.5' }: LoadingSpinnerProps) => (
  <Spinner color={color} borderSize={borderSize} />
);

export { LoadingSpinner };
