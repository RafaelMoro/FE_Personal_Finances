import {
  EditOutlined, DeleteOutlined, Close, LogoutOutlined,
} from '@mui/icons-material';
import { AppColors } from '../../../styles';

interface IconProps {
  size?: string;
  fillColor?: string;
}

const DEFAULT_SIZE = '2.5rem';
const DEFAULT_SIZE_CLOSE_ICON = '3.5rem';

export const DeleteIcon = ({ size = DEFAULT_SIZE, fillColor }: IconProps) => (
  <DeleteOutlined sx={{ fontSize: size, fill: fillColor ?? AppColors.negative }} />
);

export const EditIcon = ({ size = DEFAULT_SIZE, fillColor }: IconProps) => (
  <EditOutlined sx={{ fontSize: size, fill: fillColor ?? AppColors.primary }} />
);

export const LogOutIcon = ({ size = DEFAULT_SIZE, fillColor }: IconProps) => (
  <LogoutOutlined sx={{ fontSize: size, fill: fillColor ?? AppColors.primary }} />
);

export const CloseIcon = ({ size = DEFAULT_SIZE_CLOSE_ICON, fillColor }: IconProps) => (<Close sx={{ fontSize: size }} />);
