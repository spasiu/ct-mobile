import { ViewStyle, TextStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { COLORS } from '../../theme/colors';

export const GRADIENT_PRESETS = {
  colors: [COLORS.transparent, COLORS.alpha_black] as string[],
  start: { x: 0.5, y: 0.5 },
  style: [s.flx_i] as ViewStyle[],
};

export const CONTENT_CONTAINER_STYLE_PRESET = [s.flx_i, s.pa3] as ViewStyle[];

export const TITLE_STYLE_PRESET = [
  s.ff_alt_sb,
  s.f6,
  s.white,
  s.mb2,
] as TextStyle[];

export const DESCRIPTION_STYLE_PRESET = [
  s.ff_alt_r,
  s.f7,
  s.white,
] as TextStyle[];

export const BADGE_WRAPPER_STYLE_PRESET = [
  s.flx_row,
  s.jcsb,
  s.h3,
] as ViewStyle[];

export const CONTENT_WRAPPER_STYPE_PRESET = [s.flx_i, s.jcfe] as ViewStyle[];
