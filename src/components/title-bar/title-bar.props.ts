import React from 'react';
import { TextStyle } from 'react-native';

export interface TitleBarProps {
  title?: string;
  subtitle?: string;
  titleStyle?: TextStyle[];
  subtitleStyle?: TextStyle[];
  wrapperStyle?: TextStyle[];
  rightElement?: React.ReactNode;
}
