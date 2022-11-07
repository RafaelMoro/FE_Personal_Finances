import {
  ErrorOutlineOutlined, ReportProblemOutlined, CheckCircleOutlineOutlined, InfoOutlined,
} from '@mui/icons-material';
import { AppColors } from '../../../styles';

const {
  info, warning, positive, negative,
} = AppColors;

export const SystemStateIcons = {
  ERROR: <ErrorOutlineOutlined sx={{ fontSize: '2.5rem', fill: negative }} />,
  WARNING: <ReportProblemOutlined sx={{ fontSize: '2.5rem', fill: warning }} />,
  SUCCESS: <CheckCircleOutlineOutlined sx={{ fontSize: '2.5rem', fill: positive }} />,
  INFO: <InfoOutlined sx={{ fontSize: '2.5rem', fill: info }} />,
};
