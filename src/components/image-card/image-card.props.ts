import { ImageSourcePropType, ViewStyle } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import { ImageCardSizeTypes } from './image-card.presets';

export interface ImageCardProps extends BorderlessButtonProps {
  children?: React.ReactNode;
  cardSize?: ImageCardSizeTypes;
  image: ImageSourcePropType;
  touchable?: boolean;
  containerStyle?: ViewStyle[];
}
