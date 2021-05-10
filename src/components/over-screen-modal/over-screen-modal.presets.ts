import { styles as s } from 'react-native-style-tachyons';

export const BACK_SCREEN_STYLE = [s.flx_i, s.shadow_l];

export const MODAL_CONTAINER_STYLE = [s.flx_i, s.bg_transparent, s.jcfe];

export const getModalWrapperStyle = (ratio: number) => [
  s.mt5,
  s.bg_alpha_primary_5,
  s.w_100,
  s.br4,
  s.br__top,
  s.flx_ratio(ratio),
  s.pt3,
];

export const TITLE_BAR_STYLE = [s.w_100, s.flx_row, s.jcc, s.aic];

export const BUTTON_WRAPPER_STYLE = [s.flx_ratio(0.1), s.aife];

export const TITLE_TEXT_STYLE = [s.flx_i, s.tc, s.ff_b, s.f4];

export const CLOSE_BUTTON_STYLE = [s.tint_black, s.icon_xxs, s.mr3];
