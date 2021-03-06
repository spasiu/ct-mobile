import { ViewStyle } from 'react-native';
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
  cardWidth?: number;
  cardHeight?: number;
  image: string;
  touchable?: boolean;
  containerStyle?: ViewStyle[];
  onPress?: () => void;
  fill?: string;
  compress?: boolean;
}
