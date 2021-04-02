import { TextStyle, ViewStyle } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

export interface TextLinkProps extends RectButtonProps {
  text?: string;
  style?: ViewStyle[];
  textStyle?: TextStyle[];
  onPress?: () => void;
}
