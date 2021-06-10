import { ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { PageIndicatorTypes } from './pagination.props';

export const baseContainerStyle = [
  s.w_100,
  s.h3,
  s.flx_row,
  s.jcsb,
  s.aic,
  s.ph4,
] as ViewStyle[];

export const baseIndicatorWrapperStyle = [
  s.flx_i,
  s.flx_row,
  s.aic,
  s.jcc,
] as ViewStyle[];

export const baseButtonsWrapperStyle = [s.flx_ratio(0.2)];

export const defaultIndicatorColorStyle = s.bg_black_10 as ViewStyle;
export const activeIndicatorColorStyle = s.bg_black as ViewStyle;

export const indicatorTypeStyle = {
  [PageIndicatorTypes.dot]: [s.circle_micro, s.mh1] as ViewStyle[],
  [PageIndicatorTypes.dash]: [s.w2, s.h_custom(4), s.br4, s.mh1] as ViewStyle[],
};
