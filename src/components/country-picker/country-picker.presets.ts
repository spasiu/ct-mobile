import { styles as s, sizes } from 'react-native-style-tachyons';

import { COLORS } from '../../theme/colors';
import { INTER_REGULAR } from '../../theme/fonts';

export const modalStyle = [s.ma0, s.jcfe];
export const contentWrapperStyle = [
  s.w_100,
  s.h6,
  s.br4,
  s.no_overflow,
  s.ph3,
  s.pt3,
  s.bg_black_5,
];

export const countryPickerTheme = {
  backgroundColor: COLORS.black_5,
  fontFamily: INTER_REGULAR.fontFamily,
  fontSize: sizes.f5,
  primaryColor: COLORS.black,
};
