import { TextStyle, ViewStyle } from 'react-native';

import { ImageCardProps } from '../image-card/image-card.props';
export interface BreakerCardProps extends ImageCardProps {
  title?: string;
  description?: string;
  titleTextStyle?: TextStyle[];
  descriptionTextStyle?: TextStyle[];
  contentContainerStyle?: ViewStyle[];
}
