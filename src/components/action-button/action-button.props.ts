import { ViewStyle, TextStyle } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import { ActionButtonTypes } from './action-button.presets';

export interface ActionButtonProps extends BorderlessButtonProps {
  text?: string;
  style?: ViewStyle[];
  textStyle?: TextStyle[];
  buttonType?: ActionButtonTypes;
  children?: React.ReactNode;
}
