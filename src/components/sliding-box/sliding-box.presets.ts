import { TextStyle, ViewStyle } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

export const containerPreset = [
  s.w4,
  s.br3,
  s.jcsb,
  s.bg_alpha_primary,
  {
    height: sizes.h3 + sizes.h2,
  },
  s.no_overflow,
];

export const actionButtonStyle = [
  s.badge_height,
  s.w_100,
  s.br3,
] as ViewStyle[];

export const actionButtonTextStyle = [s.f7] as TextStyle[];

export const contentStyle = [s.flx_ratio(0.85), s.pa2];

export const handleDefaultStyle = [s.flx_ratio(0.15), s.bg_primary];

export const childrenWrapperStyle = [s.flx_i];

export const actionButtonWrapperStyle = [s.mt2];

export const boxWrapperStyle = [s.flx_i, s.flx_row];

export const handleTextStyle = [s.f7, s.ff_alt_sb, s.white];

export const textContainerStyle = [s.absolute, s.rotate_minus_90];
