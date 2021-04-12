import { ViewStyle } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

const BADGE_HEIGHT = sizes.h1 * 1.5;

export const CONTAINER_STYLE_PRESET = [
  s.bg_black_60,
  s.pa1,
  s.flx_row,
  { height: BADGE_HEIGHT },
  s.br4,
  s.jcc,
  s.aic,
  s.ph2,
] as ViewStyle[];

export const IMAGE_STYLE_PRESET = [s.mr1];

export const TEXT_STYLE_PRESET = [s.ff_alt_sb, s.f7, s.white];
