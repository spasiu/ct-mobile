import { ImageSourcePropType, TextStyle, ViewStyle } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

export interface RowLinkProps extends BorderlessButtonProps {
  text?: string;
  icon?: ImageSourcePropType;
  containerStyle?: ViewStyle[];
  textStyle?: TextStyle[];
}
