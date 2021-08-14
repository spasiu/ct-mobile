import { TextStyle, ViewStyle } from 'react-native';
import { LinearGradientProps } from 'react-native-linear-gradient';
import { styles as s } from 'react-native-style-tachyons';

import { COLORS } from '../../theme/colors';

export const gradientPresets: LinearGradientProps = {
  colors: [COLORS.transparent, COLORS.alpha_black],
  start: { x: 0, y: 0.5 },
  end: { x: 0, y: 1 },
  style: [s.flx_i],
};

export const contentContainerStylePreset = [
  s.flx_i,
  s.jcfe,
  s.pa3,
] as ViewStyle[];

export const titleStylePreset = {
  micro: [s.ff_alt_sb, s.f6, s.white, s.mb2] as TextStyle[],
  small: [s.ff_alt_sb, s.f6, s.white, s.mb2] as TextStyle[],
  medium: [s.ff_alt_sb, s.f6, s.white, s.mb2] as TextStyle[],
  large: [s.ff_alt_sb, s.f4, s.white, s.mb2] as TextStyle[],
};

export const descriptionStylePreset = {
  micro: [s.ff_alt_r, s.f7, s.white] as TextStyle[],
  small: [s.ff_alt_r, s.f7, s.white] as TextStyle[],
  medium: [s.ff_alt_r, s.f7, s.white] as TextStyle[],
  large: [s.ff_alt_r, s.f5, s.white] as TextStyle[],
};

export const buttonAbsoluteWrapper = [s.absolute, s.right_2, s.top_1];

export const followButtonStyle = {
  container: [s.bg_white],
  image: [s.tint_black],
};
