import { ViewStyle } from 'react-native';

export enum PageIndicatorTypes {
  dot = 'dot',
  dash = 'dash',
}
export interface PaginationProps {
  index: number;
  total: number;
  pageIndicator?: keyof typeof PageIndicatorTypes;
  rightButton?: React.ReactNode;
  leftButton?: React.ReactNode;
  indicatorColor?: ViewStyle;
  activeIndicatorColor?: ViewStyle;
  containerStyle?: ViewStyle[];
}
