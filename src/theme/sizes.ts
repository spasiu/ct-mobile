import { Dimensions } from 'react-native';

export const SIZES = {
  ICON_MICRO: 8,
  ICON_XS: 22,
  ICON_S: 25,
  ICON_M: 32,
  ICON_L: 48,
  ICON_XL: 91,
} as const;

export const DEFAULT_BORDER_WIDTH = 1;

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
