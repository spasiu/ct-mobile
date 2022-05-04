import { ViewStyle } from 'react-native';

import { ImageCardProps } from '../image-card';
import { StatusBadgeTypes } from '../status-badge';
export interface EventCardProps extends ImageCardProps {
  eventId: string;
  title?: string;
  contentContainerStyle?: ViewStyle[];
  eventDate: string;
  status: keyof typeof StatusBadgeTypes;
  onPressFollow?: () => void;
  userFollows?: boolean;
  result?: boolean,
}
