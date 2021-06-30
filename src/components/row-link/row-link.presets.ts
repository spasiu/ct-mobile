import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { ArrowDirection } from './row-link.props';

export const arrowRightIcon = require('../../assets/arrow-right.png');

export const rowLinkContainerStyle = [
  s.flx_row,
  s.bg_white,
  s.h3,
  s.br4,
] as ViewStyle[];

export const contentWrapperStyle = [
  s.flx_row,
  s.flx_i,
  s.aic,
  s.ph3,
] as ViewStyle[];

export const baseIconStyle = [s.icon_xs, s.mr2] as ImageStyle[];

export const baseTextStyle = [s.ff_alt_sb, s.f5] as TextStyle[];

export const arrowWrapperStyle = [
  s.flx_ratio(0.3),
  s.jcc,
  s.aife,
] as ViewStyle[];

export const arrowBaseStyle = [s.icon_s, s.mr3] as ImageStyle[];

export const arrowStyle = {
  [ArrowDirection.right]: arrowBaseStyle,
  [ArrowDirection.down]: [...arrowBaseStyle, s.rotate_90] as ImageStyle[],
};
