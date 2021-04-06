import { ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export const BASE_CONTAINER_STYLE = [
  s.w_100,
  s.h3,
  s.flx_row,
  s.jcsb,
  s.aic,
  s.ph4,
] as ViewStyle[];

export const BASE_INDICATOR_WRAPPER_STYLE = [
  s.flx_i,
  s.flx_row,
  s.aic,
  s.jcc,
] as ViewStyle[];

export const DEFAULT_INDICATOR_STYLE = s.bg_mercury as ViewStyle;
export const ACTIVE_INDICATOR_STYLE = s.bg_woodsmoke as ViewStyle;

export const INDICATOR_TYPE_STYLE = {
  dot: [s.circle_micro, s.mh1] as ViewStyle[],
  dash: [s.circle_micro, s.mh1] as ViewStyle[],
};

export type PageIndicatorTypes = keyof typeof INDICATOR_TYPE_STYLE;
