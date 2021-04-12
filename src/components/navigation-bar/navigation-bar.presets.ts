import { styles as s, sizes } from 'react-native-style-tachyons';

export const NAVIGATION_BAR_CONTAINER_STYLE = [
  { height: sizes.h2 + sizes.h1 },
  s.flx_row,
  s.mv3,
  s.mr3,
  s.ml3,
];

export const DEFAULT_NAVIGATION_BAR_WRAPPER_STYLE = [
  s.flx_i,
  s.flx_row,
  s.aic,
  s.jcsb,
];

export const SIDES_WRAPPER_STYLE = [s.h_100, s.flx_ratio(0.15), s.jcc, s.aifs];

export const TITLE_TEXT_STYLE = [s.ff_b, s.black, s.f4];
