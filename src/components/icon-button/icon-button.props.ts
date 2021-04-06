import { ViewStyle, ImageURISource } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

export interface IconButtonProps extends BorderlessButtonProps {
  image: ImageURISource | number;
  style?: ViewStyle[];
}
