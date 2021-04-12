import NativeTachyons from 'react-native-style-tachyons';
import { StyleSheet } from 'react-native';

import { getRootRem, getCircleStyle } from './utils';
import { COLORS } from './colors';
import { ICON_SIZE } from './sizes';

NativeTachyons.build(
  {
    typeScale: {
      f1: 3,
      f2: 2.25,
      f3: 1.5,
      f4: 1.25,
      f5: 1,
      f6: 0.875,
      f7: 0.7,
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
      lh_high: { lineHeight: 24 },
      h_100: { height: '100%' },
      h_75: { height: '75%' },
      w_100: { width: '100%' },
      h_custom: (pixels: number) => ({ height: pixels }),
      flx_ratio: (r: number) => ({
        flex: r,
      }),
      circle_micro: getCircleStyle(ICON_SIZE.MICRO),
      circle_xs: getCircleStyle(ICON_SIZE.XS),
      circle_s: getCircleStyle(ICON_SIZE.S),
      circle_m: getCircleStyle(ICON_SIZE.M),
      circle_l: getCircleStyle(ICON_SIZE.L),
      circle_xl: getCircleStyle(ICON_SIZE.XL),
      shadow_s: {
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      },
      shadow_m: {
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      },
      no_overflow: { overflow: 'hidden' },
    },
  },
  StyleSheet,
);
