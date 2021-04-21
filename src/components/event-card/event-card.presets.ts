import { ViewStyle, TextStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { COLORS } from '../../theme/colors';

export const GRADIENT_PRESETS = {
  colors: [COLORS.transparent, COLORS.alpha_black] as string[],
  start: { x: 0, y: 0.5 },
  end: { x: 0, y: 1 },
  style: [s.flx_i] as ViewStyle[],
};

export const CONTENT_CONTAINER_STYLE_PRESET = [s.flx_i, s.pa3] as ViewStyle[];

export const TITLE_STYLE_PRESET = [
  s.ff_alt_sb,
  s.f6,
  s.white,
  s.flx_ratio(0.8),
] as TextStyle[];

export const INFO_WRAPPER_STYLE_PRESET = [s.flx_row, s.jcsb] as ViewStyle[];

export const CONTENT_WRAPPER_STYLE = [
  s.flx_i,
  s.jcsb,
  s.aife,
  s.flx_row,
] as ViewStyle[];

export const FOOTER_WRAPPER_STYLE = [s.flx_row, s.aic];

export const FOLLOW_BUTTON_WRAPPER_STYLE = [s.flx_ratio(0.2), s.jcc, s.aic];

export const FOLLOW_BUTTON_STYLE = {
  container: [s.bg_white],
  image: [s.tint_black],
};
