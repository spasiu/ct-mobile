import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { sizes, styles as s } from 'react-native-style-tachyons';

export const cardContainerStyle = [
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
] as ViewStyle[];

export const informationBarWrapperStyle = [
  s.flx_row,
  s.jcsb,
  s.aifs,
] as ViewStyle[];

export const breakDetailWrapperStyle = [
  s.flx_row,
  s.w_40,
  s.jcfe,
] as ViewStyle[];

export const breakerAvatarStyle = [s.circle_xs] as ImageStyle[];

export const breakTitleStyle = [s.ff_b, s.f5, s.black] as TextStyle[];

export const breakDetailsWrapper = [s.jcfe, s.aifs] as ViewStyle[];

export const priceTextStyle = [
  s.ff_alt_sb,
  s.f7,
  s.black,
  s.mb1,
] as TextStyle[];

export const spotsLeftStyle = [s.ff_alt_r, s.f7, s.primary] as TextStyle[];

export const actionsContainerStyle = [
  s.absolute,
  s.bottom_0,
  s.right_0,
  s.pr3,
  s.pb3,
  s.flx_row,
  s.w_40,
  s.jcfe,
] as ViewStyle[];

export const buyButtonStyle = [
  { width: sizes.w3 + sizes.w1 },
  s.ml2,
] as ViewStyle[];
