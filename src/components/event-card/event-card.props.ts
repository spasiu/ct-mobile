import { ViewStyle } from 'react-native';

import { Sports } from '../../common/sports';

import { ImageCardProps } from '../image-card';
import { StatusBadgeTypes } from '../status-badge';
export interface EventCardProps extends ImageCardProps {
  title?: string;
  contentContainerStyle?: ViewStyle[];
  league: typeof Sports[keyof typeof Sports];
  eventDate: string;
  status: keyof typeof StatusBadgeTypes;
}
