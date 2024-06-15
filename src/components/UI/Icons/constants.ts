import {
  DeleteOutlined, ErrorOutlineOutlined, EditOutlined, LogoutOutlined, Close,
  DoneOutlined, Visibility, VisibilityOff, KeyboardArrowUpOutlined,
  Celebration, MonetizationOn,
  Fastfood, House, Engineering, Language, DirectionsCar,
  AccountBalance, MedicalInformation, FamilyRestroom, ShoppingCart,
  Menu,
} from '@mui/icons-material';
import { AllCategoryIcons, AppIcons } from './interface';
import { AppColors } from '../../../styles';

export const APP_ICONS: AppIcons = {
  Delete: {
    icon: DeleteOutlined,
    defaultColor: AppColors.negative,
  },
  Error: {
    icon: ErrorOutlineOutlined,
    defaultColor: AppColors.negative,
  },
  Edit: {
    icon: EditOutlined,
    defaultColor: AppColors.primary,
  },
  LogOut: {
    icon: LogoutOutlined,
    defaultColor: AppColors.primary,
  },
  Close: {
    icon: Close,
    defaultColor: AppColors.grey,
  },
  GoToTop: {
    icon: KeyboardArrowUpOutlined,
    defaultColor: AppColors.grey,
  },
  TickMark: {
    icon: DoneOutlined,
    defaultColor: AppColors.positive,
  },
  Visibility: {
    icon: Visibility,
    defaultColor: AppColors.black,
  },
  VisibilityOff: {
    icon: VisibilityOff,
    defaultColor: AppColors.black,
  },
  HamburguerMenu: {
    icon: Menu,
    defaultColor: AppColors.white,
  },
};

export const categoryIcons: AllCategoryIcons = {
  foodAndDrink: Fastfood,
  house: House,
  utilities: Engineering,
  subcriptions: Language,
  transportation: DirectionsCar,
  debtAndLoans: AccountBalance,
  healthCare: MedicalInformation,
  kids: FamilyRestroom,
  shopping: ShoppingCart,
  entertainment: Celebration,
  savings: MonetizationOn,
};
