import { Dimensions } from 'react-native';

export const ICON_SIZE = {
  MICRO: 8,
  XS: 20,
  S: 25,
  M: 32,
  L: 48,
  XL: 91,
} as const;

export const DEFAULT_BORDER_WIDTH = 1;

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
