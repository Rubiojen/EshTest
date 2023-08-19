// Global State
import {NavigationProp} from '@react-navigation/native';
import {SCREEN} from './enums';
import {colorsTheme} from './globalStyles';

export type AppColorType = keyof typeof colorsTheme.DARK;

// Apps State
export type Platform = 'ios' | 'android';

const iconTypes = {
  Feather: 'Feather',
  Ionicons: 'Ionicons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  MaterialIcons: 'MaterialIcons',
};

export type TextVariant =
  | 'title18'
  | 'title20'
  | 'title24'
  | 'title32'
  | 'title40'
  | 'title48'
  | 'bodyRegular10'
  | 'bodyRegular12'
  | 'bodyRegular14'
  | 'bodyRegular16'
  | 'bodyRegular18'
  | 'bodyRegular20'
  | 'bodyMedium10'
  | 'bodyMedium12'
  | 'bodyMedium14'
  | 'bodyMedium16'
  | 'bodyMedium18'
  | 'bodyMedium20'
  | 'bodySemibold10'
  | 'bodySemibold12'
  | 'bodySemibold14'
  | 'bodySemibold16'
  | 'bodySemibold18'
  | 'bodySemibold20'
  | 'bodyBold10'
  | 'bodyBold12'
  | 'bodyBold14'
  | 'bodyBold16'
  | 'bodyBold18'
  | 'bodyBold20';

export type ICON_TYPES = keyof typeof iconTypes;
// Navigation ################################################################################################################

export type RootNavigationProps = NavigationProp<RootStackParamList>;

export type RootStackParamList = {
  [SCREEN.Welcome]: undefined;
  [SCREEN.Home]: undefined;
  [SCREEN.Profile]: undefined;
};

// APP ################################################################################################################

export type User = {
  isLoggedIn: boolean;
  userName: string;
  id: string;
};

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export type ExpenseFilters = {
  title: string;
  amount?: number;
  date: string;
};

// SHEET ################################################################################################################

export interface Sheet {
  isOpen?: boolean;
  darkenBackground?: boolean;
  finishCloseAnimation?: boolean;
  type?: SheetType;
  canCloseOutside?: boolean;
  data?: any;
}

export type SheetType = 'CraeteExpense' | 'EditExpense' | 'FilterExpenses';
