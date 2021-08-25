import React from 'react';
import { ViewStyle } from 'react-native';

export interface SlidingBoxProps {
  children?: React.ReactNode;
  isActionBuy?: boolean;
  actionText?: string;
  actionDisabled?: boolean;
  onPressAction?: () => void;
  containerStyle?: ViewStyle[];
  handleStyle?: ViewStyle[];
  handleText?: string;
  onPressBox?: () => void;
}
