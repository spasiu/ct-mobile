import { sizes, styles as s } from 'react-native-style-tachyons';
import { ICON_SIZE } from '../../theme/sizes';
import { COLORS } from '../../theme/colors';

export const containerStyle = [{ height: sizes.h4 + sizes.h2 }, s.w4, s.aic];

export const paginationMarginTop = sizes.mt2;

export const paginationStyle = {
  width: ICON_SIZE.MICRO,
  height: ICON_SIZE.MICRO,
  borderRadius: ICON_SIZE.MICRO / 2,
  marginTop: sizes.mt2,
  marginHorizontal: sizes.mh1,
};

export const paginationActiveItemStyle = { backgroundColor: COLORS.black };

export const paginationInactiveItemStyle = {
  backgroundColor: COLORS.black_40,
};

export const imageStyle = [
  {
    height: sizes.h3 + sizes.h3,
  },
  s.w4,
];
