import { TextStyle, ViewStyle } from 'react-native';

import { ImageCardProps } from '../image-card/image-card.props';

export interface EventCardProps extends ImageCardProps {
  title?: string;
  description?: string;
  titleTextStyle?: TextStyle[];
  descriptionTextStyle?: TextStyle[];
  contentContainerStyle?: ViewStyle[];
  status?: 'live' | 'upcoming' | 'scheduled'; // change to data status when models available
  viewCount?: string;
}
