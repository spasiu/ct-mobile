import { ViewStyle } from 'react-native';

export interface NavigationBarProps {
  children?: React.ReactNode;
  containerStyle?: ViewStyle[];
  title?: string;
  onBackPressed?: () => void;
}
