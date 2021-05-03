import { sizes, styles as s } from 'react-native-style-tachyons';

export const CARD_CONTAINER_STYLE = [
  { height: sizes.h4 + sizes.h1 },
  s.flx_i,
  s.pa3,
  s.br3,
  s.mb3,
  s.jcsb,
  s.bg_white,
  s.shadow_s,
  s.ml1,
  s.mr1,
];

export const INFORMATION_BAR_WRAPPER_STYLE = [s.flx_row, s.jcsb, s.aifs];

export const BREAK_DETAIL_WRAPPER_STYLE = [s.flx_row, s.w_40, s.jcfe];

export const BREAKER_AVATAR_STYLE = [s.circle_xs];

export const BREAK_TITLE_STYLE = [s.ff_b, s.f5, s.black];

export const BREAK_DETAILS_WRAPPER = [s.jcfe, s.aifs];

export const PRICE_TEXT_STYLE = [s.ff_alt_sb, s.f7, s.black, s.mb1];

export const SPOTS_LEFT_STYLE = [s.ff_alt_r, s.f7, s.primary];

export const ACTIONS_CONTAINER_STYLE = [
  s.absolute,
  s.bottom_0,
  s.right_0,
  s.pr3,
  s.pb3,
  s.flx_row,
  s.w_40,
  s.jcfe,
];

export const BUY_BUTTON_STYLE = [{ width: sizes.w3 + sizes.w1 }, s.ml2];
