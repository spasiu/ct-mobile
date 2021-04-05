import NativeTachyons from 'react-native-style-tachyons';
import { StyleSheet } from 'react-native';

import { getRootRem, getCircleStyle } from './utils';
import { COLORS } from './colors';
import { SIZES } from './sizes';

NativeTachyons.build(
  {
    typeScale: {
      f1: 3,
      f2: 2.25,
      f3: 1.5,
      f4: 1.25,
      f5: 1,
      f6: 0.875,
      f7: 0.625,
    },
    rem: getRootRem(),
    colors: {
      palette: COLORS,
    },
    customStyles: {
      ff_r: { fontFamily: 'DMSans-Regular', fontWeight: '400' },
      ff_m: { fontFamily: 'DMSans-Medium', fontWeight: '500' },
      ff_b: { fontFamily: 'DMSans-Bold', fontWeight: '700' },
      ff_alt_r: { fontFamily: 'Inter-Regular', fontWeight: '400' },
      ff_alt_m: { fontFamily: 'Inter-Medium', fontWeight: '500' },
      ff_alt_sb: { fontFamily: 'Inter-Medium', fontWeight: '600' },
      ff_alt_b: { fontFamily: 'Inter-Bold', fontWeight: '700' },
      h_100: { height: '100%' },
      w_100: { width: '100%' },
      h_1px: { height: 1 },
      flx_ratio: (r: number) => ({
        flex: r,
      }),
      circle_xs: getCircleStyle(SIZES.ICON_XS),
      circle_s: getCircleStyle(SIZES.ICON_S),
      circle_m: getCircleStyle(SIZES.ICON_M),
      circle_l: getCircleStyle(SIZES.ICON_L),
      circle_xl: getCircleStyle(SIZES.ICON_XL),
    },
  },
  StyleSheet,
);
