import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export interface OverScreenModalProps {
  isVisible?: boolean;
  ratio?: number;
  title?: string;
  action?: string;
  actionLoading?: boolean;
  actionEnabled?: boolean;
  onPressClose?: () => void;
  onPressAction?: () => void;
  onPressBack?: () => void;
  showBack?: boolean;
  showClose?: boolean;
  actionStyle?: ViewStyle[];
  children?: React.ReactNode;
  bottomComponent?: React.ReactNode;
  containerStyle?: ViewStyle[];
  titleStyle?: TextStyle[];
}
