import { ViewStyle, TextStyle } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { ActionButtonTypes } from './action-button.presets';

export interface ActionButtonProps extends RectButtonProps {
  text?: string;
  style?: ViewStyle[];
  textStyle?: TextStyle[];
  buttonType?: ActionButtonTypes;
  children?: React.ReactNode;
}
