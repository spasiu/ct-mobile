import React from 'react';
import { ViewStyle } from 'react-native';

export interface OverScreenModalProps {
  isVisible?: boolean;
  ratio?: number;
  title?: string;
  action?: string;
  actionLoading?: boolean;
  onPressClose?: () => void;
  onPressAction?: () => void;
  onPressBack?: () => void;
  showBack?: boolean;
  actionStyle?: ViewStyle[];
  children?: React.ReactNode;
  bottomComponent?: React.ReactNode;
}
