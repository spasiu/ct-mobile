import React from 'react';
import { ViewStyle } from 'react-native';

export interface OverScreenModalProps {
  isVisible?: boolean;
  ratio?: number;
  title?: string;
  action?: string;
  onPressClose?: () => void;
  onPressAction?: () => void;
  actionStyle?: ViewStyle[];
  children?: React.ReactNode;
  bottomComponent?: React.ReactNode;
}
