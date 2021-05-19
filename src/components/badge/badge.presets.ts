import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export const containerStylePreset = [
  s.bg_black_60,
  s.pa1,
  s.flx_row,
  s.badge_height,
  s.br4,
  s.jcc,
  s.aic,
  s.ph2,
] as ViewStyle[];

export const imageStylePreset = [s.mr1] as ImageStyle[];

export const textStylePreset = [s.ff_alt_sb, s.f7, s.white] as TextStyle[];
