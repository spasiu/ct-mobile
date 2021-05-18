import { ViewStyle, TextStyle } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

export enum ActionButtonTypes {
  primary = 'primary',
  secondary = 'secondary',
  disabled = 'disabled',
}
export interface ActionButtonProps extends BorderlessButtonProps {
  text?: string;
  style?: ViewStyle[];
  textStyle?: TextStyle[];
  buttonType?: keyof typeof ActionButtonTypes;
  children?: React.ReactNode;
}
