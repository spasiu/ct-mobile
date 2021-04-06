import { ViewStyle } from 'react-native';

import { PageIndicatorTypes } from './pagination.presets';

export interface PaginationProps {
  index: number;
  total: number;
  pageIndicator?: PageIndicatorTypes;
  rightButton?: React.ReactNode;
  leftButton?: React.ReactNode;
  indicatorColor?: ViewStyle;
  activeIndicatorColor?: ViewStyle;
  containerStyle?: ViewStyle[];
}
