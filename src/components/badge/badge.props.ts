import {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface BadgeProps {
  text?: string;
  textStyle?: TextStyle[];
  image?: ImageSourcePropType;
  imageStyle?: ImageStyle[];
  containerStyle?: ViewStyle[];
}
