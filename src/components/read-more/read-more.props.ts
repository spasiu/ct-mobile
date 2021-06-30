import React from 'react';
import { TextStyle } from 'react-native';

export interface ReadMoreProps {
  mainTextStyle?: TextStyle[];
  numberOfLines?: number;
  children?: React.ReactNode;
}
