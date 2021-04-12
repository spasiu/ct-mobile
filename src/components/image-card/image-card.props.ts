import { ImageSourcePropType, ViewStyle } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { ImageCardSizeTypes } from './image-card.presets';

export interface ImageCardProps extends RectButtonProps {
  children?: React.ReactNode;
  cardSize?: ImageCardSizeTypes;
  image: ImageSourcePropType;
  touchable?: boolean;
  containerStyle?: ViewStyle[];
}
