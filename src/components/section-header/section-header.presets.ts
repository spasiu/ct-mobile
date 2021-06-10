import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export const baseContainerStyle = [
  s.h3,
  s.flx_row,
  s.jcsb,
  s.aic,
] as ViewStyle[];

export const baseTitleTextStyle = [s.ff_b, s.f5] as TextStyle[];

export const baseActionTextStyle = [
  s.ff_alt_sb,
  s.f6,
  s.primary,
] as TextStyle[];

export const contentWrapperStyle = [s.flx_row, s.aic] as ViewStyle[];

export const imageStyle = [s.circle_s, s.mr2] as ImageStyle[];
