import React from 'react';
import {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

export enum ArrowDirection {
  right = 'right',
  down = 'down',
}

export interface RowLinkProps extends BorderlessButtonProps {
  text?: string;
  icon?: ImageSourcePropType;
  iconStyle?: ImageStyle[];
  containerStyle?: ViewStyle[];
  textStyle?: TextStyle[];
  showArrow?: boolean;
  arrowDirection?: ArrowDirection;
  rightElement?: React.ReactNode;
  rightElementContainerStyle?: ViewStyle[];
}
