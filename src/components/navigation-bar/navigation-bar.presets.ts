import { ViewStyle, TextStyle } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

export const navigationBarContainerStyle = [
  { height: sizes.h2 + sizes.h1 },
  s.flx_row,
  s.mv3,
  s.mr3,
  s.ml3,
] as ViewStyle[];

export const defaultNavigationBarWrapperStyle = [
  s.flx_i,
  s.flx_row,
  s.aic,
  s.jcsb,
] as ViewStyle[];

export const sidesWrapperStyle = [
  s.h_100,
  s.flx_ratio(0.15),
  s.jcc,
  s.aifs,
] as ViewStyle[];

export const titleTextStyle = [s.ff_b, s.black, s.f4] as TextStyle[];
