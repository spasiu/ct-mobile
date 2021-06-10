import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

import { COLORS } from '../../theme/colors';
import { t } from '../../i18n/i18n';

export const searchIcon = require('../../assets/search-icon.png');

export const searchInputContainerStyle = [
  { height: sizes.h2 + sizes.h1 },
  s.bg_white,
  s.br3,
  s.flx_row,
  s.shadow_s,
] as ViewStyle[];

export const searchIconWrapperStyle = [
  s.flx_ratio(0.15),
  s.jcc,
  s.aic,
] as ViewStyle[];

export const searchIconStyle = [s.flx_i] as ImageStyle[];

export const searchInputStyle = [
  s.flx_ratio(0.85),
  s.ff_b,
  s.black,
] as TextStyle[];

export const placeholderTextColor = COLORS.black;

export const inputPlaceholderText = t('search.action');
