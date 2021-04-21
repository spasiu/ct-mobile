import { ImageStyle, ViewStyle } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import {
  FollowButtonTypes,
  FollowButtonSizeTypes,
} from './follow-button.presets';

export interface FollowButtonProps extends BorderlessButtonProps {
  type?: FollowButtonTypes;
  size?: FollowButtonSizeTypes;
  defaultContainerStyle?: ViewStyle[];
  selectedContainerStyle?: ViewStyle[];
  defaultImageStyle?: ImageStyle[];
  selectedImageStyle?: ImageStyle[];
}
