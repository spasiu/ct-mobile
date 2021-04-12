import { ImageProps, TextProps, ViewStyle } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

export interface IconButtonProps extends BorderlessButtonProps {
  children?: React.ReactElement<ImageProps> | React.ReactElement<TextProps>;
  style?: ViewStyle[];
}
