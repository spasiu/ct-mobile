import { TextStyle, ViewStyle } from 'react-native';

import { ImageCardProps } from '../image-card';
import { StatusBadgeTypes } from '../status-badge';

export interface FeaturedBreakCardProps extends ImageCardProps {
  title?: string;
  description?: string;
  titleTextStyle?: TextStyle[];
  descriptionTextStyle?: TextStyle[];
  contentContainerStyle?: ViewStyle[];
  status?: keyof typeof StatusBadgeTypes;
  viewCount?: string;
  eventDate?: string;
}
