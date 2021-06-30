import { TextStyle, ViewStyle } from 'react-native';

import { ImageCardProps } from '../image-card';

export interface HitCardProps extends ImageCardProps {
  title?: string;
  textStyle?: TextStyle[];
  cardStyle?: ViewStyle[];
  showTitle?: boolean;
}
