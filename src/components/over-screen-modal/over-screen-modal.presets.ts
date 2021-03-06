import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export const overScreenModalStyle = [s.mh0, s.mb0];

export const modalContainerStyle = [s.flx_i, s.jcfe] as ViewStyle[];

export const getModalWrapperStyle = (ratio: number): ViewStyle[] =>
  [
    s.mt4,
    s.bg_alpha_primary_5,
    s.w_100,
    s.h_100,
    s.br4,
    s.br__top,
    s.flx_ratio(ratio),
    s.pt3,
  ] as ViewStyle[];

export const titleBarStyle = [s.w_100, s.flx_row, s.jcc, s.aic] as ViewStyle[];

export const buttonWrapperStyle = [s.flx_ratio(0.1), s.aife] as ViewStyle[];

export const titleTextStyle = [s.flx_i, s.tc, s.ff_b, s.f4] as TextStyle[];

export const closeButtonStyle = [
  s.tint_black,
  s.icon_xxs,
  s.mr3,
] as ImageStyle[];

export const closeIcon = require('../../assets/close-icon.png');
