import { ImageSourcePropType, ViewStyle } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

export enum ImageCardSizeTypes {
  micro = 'micro',
  small = 'small',
  medium = 'medium',
  large = 'large',
}
export interface ImageCardProps extends BorderlessButtonProps {
  children?: React.ReactNode;
  cardSize?: keyof typeof ImageCardSizeTypes;
  image: ImageSourcePropType;
  touchable?: boolean;
  containerStyle?: ViewStyle[];
}
