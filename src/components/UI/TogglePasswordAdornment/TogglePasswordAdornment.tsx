import { IconButton, InputAdornment } from '@mui/material';
import { AppIcon } from '../Icons';

interface TogglePasswordAdornmentProps {
  showPassword: boolean;
  toggleShowPassword: () => void;
}

const TogglePasswordAdornment = ({ toggleShowPassword, showPassword }: TogglePasswordAdornmentProps) => (
  <InputAdornment position="end">
    <IconButton onClick={toggleShowPassword}>
      { (showPassword) ? (<AppIcon icon="VisibilityOff" size="1.5rem" />) : (<AppIcon icon="Visibility" size="2rem" />) }
    </IconButton>
  </InputAdornment>
);

export { TogglePasswordAdornment };
