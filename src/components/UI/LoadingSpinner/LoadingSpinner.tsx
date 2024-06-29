import { LoadingSpinnerProps } from './interface';
import { AppColors } from '../../../styles';
import { Spinner } from './LoadingSpinner.styled';

const LoadingSpinner = ({ color = AppColors.white, borderSize = '0.5' }: LoadingSpinnerProps) => (
  <Spinner data-testid="loading-spinner" color={color} borderSize={borderSize} />
);

export { LoadingSpinner };
