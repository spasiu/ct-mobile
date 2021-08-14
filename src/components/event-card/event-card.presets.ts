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
  s.flx_ratio(0.8),
] as TextStyle[];

export const infoWrapperStylePreset = [s.flx_row, s.jcsb] as ViewStyle[];

export const contentWrapperStyle = [
  s.flx_i,
  s.jcsb,
  s.aife,
  s.flx_row,
] as ViewStyle[];

export const footerWrapperStyle = [s.flx_row, s.aic];

export const followButtonWrapperStyle = [s.flx_ratio(0.2), s.jcc, s.aic];

export const followButtonStyle = {
  container: [s.bg_white],
  image: [s.tint_black],
};

export const buttonAbsoluteWrapper = [s.absolute, s.right_2, s.bottom_1];
