import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '../Icons';

interface TogglePasswordAdornmentProps {
  showPassword: boolean;
  toggleShowPassword: () => void;
}

const TogglePasswordAdornment = ({ toggleShowPassword, showPassword }: TogglePasswordAdornmentProps) => (
  <InputAdornment position="end">
    <IconButton onClick={toggleShowPassword}>
      { (showPassword) ? (<VisibilityOff size="1.5rem" />) : (<Visibility size="2rem" />) }
    </IconButton>
  </InputAdornment>
);

export { TogglePasswordAdornment };
