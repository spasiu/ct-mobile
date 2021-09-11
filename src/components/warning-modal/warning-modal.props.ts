import React from 'react';
import { ImageSourcePropType, TextStyle } from 'react-native';

export interface WarningModalProps {
  visible?: boolean;
  title?: string;
  description?: string;
  primaryActionText?: string;
  onPrimaryActionPressed?: () => void;
  secondaryActionText?: string;
  onSecondaryActionPressed?: () => void;
  loadingPrimaryAction?: boolean;
  imageSrc?: ImageSourcePropType;
  titleStyle?: TextStyle[];
  children?: React.ReactNode;
  loading?: boolean;
}
