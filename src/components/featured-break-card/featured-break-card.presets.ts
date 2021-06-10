import { ViewStyle, TextStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { COLORS } from '../../theme/colors';

export const gradientPresets = {
  colors: [COLORS.transparent, COLORS.alpha_black] as string[],
  start: { x: 0, y: 0.5 },
  end: { x: 0, y: 1 },
  style: [s.flx_i] as ViewStyle[],
};

export const contentContainerStylePreset = [s.flx_i, s.pa3] as ViewStyle[];

export const titleStylePreset = [
  s.ff_alt_sb,
  s.f6,
  s.white,
  s.mb2,
] as TextStyle[];

export const descriptionStylePreset = [
  s.ff_alt_r,
  s.f7,
  s.white,
] as TextStyle[];

export const badgeWrapperStylePreset = [s.flx_row, s.jcsb, s.h3] as ViewStyle[];

export const contentWrapperStylePreset = [s.flx_i, s.jcfe] as ViewStyle[];
