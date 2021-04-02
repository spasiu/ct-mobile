import { TextStyle } from 'react-native';

export interface TitleBarProps {
  title?: string;
  subtitle?: string;
  titleStyle?: TextStyle[];
  subtitleStyle?: TextStyle[];
  wrapperStyle?: TextStyle[];
}
