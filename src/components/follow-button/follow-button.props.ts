import { ImageStyle, ViewStyle } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

export enum FollowButtonTypes {
  default = 'default',
  selected = 'selected',
}

export enum FollowButtonSizeTypes {
  full = 'full',
  short = 'short',
}

export interface FollowButtonProps extends BorderlessButtonProps {
  type?: keyof typeof FollowButtonTypes;
  size?: keyof typeof FollowButtonSizeTypes;
  defaultContainerStyle?: ViewStyle[];
  selectedContainerStyle?: ViewStyle[];
  defaultImageStyle?: ImageStyle[];
  selectedImageStyle?: ImageStyle[];
}
