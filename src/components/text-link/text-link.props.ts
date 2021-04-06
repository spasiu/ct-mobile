import { TextStyle, ViewStyle } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

export interface TextLinkProps extends BorderlessButtonProps {
  text?: string;
  style?: ViewStyle[];
  textStyle?: TextStyle[];
  onPress?: () => void;
}
