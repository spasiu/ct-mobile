import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export const BASE_FULL_BUTTON_STYLE = [
  s.jcc,
  s.aic,
  s.ph3,
  s.badge_br,
  s.badge_height,
];

export const BASE_SHORT_BUTTON_STYLE = [s.badge_icon, s.jcc, s.aic, s.br];

export const BUTTON_TYPE_STYLE = {
  full: {
    default: [...BASE_FULL_BUTTON_STYLE, s.bg_black_5] as ViewStyle[],
    selected: [...BASE_FULL_BUTTON_STYLE, s.bg_black] as ViewStyle[],
  },
  short: {
    default: [...BASE_SHORT_BUTTON_STYLE, s.bg_black] as ViewStyle[],
    selected: [...BASE_SHORT_BUTTON_STYLE, s.bg_positive] as ViewStyle[],
  },
};

export const BASE_TEXT_STYLE = [s.ff_alt_sb, s.f7];
export const BASE_IMAGE_STYLE = [s.jcc, s.aic];

export const BUTTON_CONTENT_STYLE = {
  full: {
    default: [...BASE_TEXT_STYLE, s.black] as TextStyle[],
    selected: [...BASE_TEXT_STYLE, s.white] as TextStyle[],
  },
  short: {
    default: BASE_IMAGE_STYLE as ImageStyle[],
    selected: BASE_IMAGE_STYLE as ImageStyle[],
  },
};

export const isFollowing = (type: string): boolean => type === 'selected';
export const isSizeFull = (size: string): boolean => size === 'full';

export type FollowButtonTypes = 'default' | 'selected';
export type FollowButtonSizeTypes = 'full' | 'short';
