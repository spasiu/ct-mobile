import { TextStyle, ViewStyle } from 'react-native';

import { ImageCardProps } from '../image-card';

export interface BreakerCardProps extends ImageCardProps {
  title?: string;
  description?: string;
  titleTextStyle?: TextStyle[];
  descriptionTextStyle?: TextStyle[];
  contentContainerStyle?: ViewStyle[];
  userFollows?: boolean;
  onPressFollow?: () => void;
  showFollow?: boolean;
}
