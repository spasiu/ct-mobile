import React from 'react';
import { TextProps, ViewProps } from 'react-native';

export interface SectionHeaderProps {
  title?: string;
  actionText?: string;
  image?: string;
  containerStyle?: ViewProps[];
  titleTextStyle?: TextProps[];
  actionTextStyle?: TextProps[];
  actionComponent?: React.ReactNode;
  onActionPressed?: () => void;
}
