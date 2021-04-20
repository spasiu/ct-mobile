import { ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { COLORS } from '../../theme/colors';

export const GRADIENT_PRESETS = {
  colors: [COLORS.transparent, COLORS.alpha_black] as string[],
  start: { x: 0, y: 0.5 },
  end: { x: 0, y: 1 },
  style: [s.flx_i] as ViewStyle[],
};

export const CONTENT_CONTAINER_STYLE_PRESET = [s.flx_i, s.jcfe, s.pa3];

export const TITLE_STYLE_PRESET = [s.ff_alt_sb, s.f6, s.white, s.mb2];

export const DESCRIPTION_STYLE_PRESET = [s.ff_alt_r, s.f7, s.white];
