import NativeTachyons from 'react-native-style-tachyons';
import { StyleSheet } from 'react-native';

import { getRootRem, getCircleStyle, getIconSize } from './utils';
import { COLORS } from './colors';
import { ICON_SIZE } from './sizes';
import {
  DM_SANS_REGULAR,
  DM_SANS_MEDIUM,
  DM_SANS_BOLD,
  INTER_REGULAR,
  INTER_MEDIUM,
  INTER_MEDIUM_EXTRA,
  INTER_BOLD,
  TECHNOLOGY_BOLD,
} from './fonts';

const rootRem = getRootRem();

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
    rem: rootRem,
    colors: {
      palette: COLORS,
    },
    customStyles: {
      ff_r: DM_SANS_REGULAR,
      ff_m: DM_SANS_MEDIUM,
      ff_b: DM_SANS_BOLD,
      ff_alt_r: INTER_REGULAR,
      ff_alt_m: INTER_MEDIUM,
      ff_alt_sb: INTER_MEDIUM_EXTRA,
      ff_alt_b: INTER_BOLD,
      ff_tech_b: TECHNOLOGY_BOLD,
      lh_high: { lineHeight: 24 },
      lh_sub: { lineHeight: 20 },
      lh_medium: { lineHeight: 17 },
      h_100: { height: '100%' },
      h_75: { height: '75%' },
      w_100: { width: '100%' },
      w_40: { width: '40%' },
      h_custom: (pixels: number) => ({ height: pixels }),
      flx_ratio: (r: number) => ({
        flex: r,
      }),
      badge_height: { height: rootRem * 1.5 },
      badge_br: { borderRadius: rootRem * 0.5 + 3 },
      badge_icon: {
        height: rootRem * 1.5,
        width: rootRem * 1.5,
        borderRadius: (rootRem * 1.5) / 2,
      },
      icon_micro: getIconSize(ICON_SIZE.MICRO),
      icon_xxs: getIconSize(ICON_SIZE.XXS),
      icon_xs: getIconSize(ICON_SIZE.XS),
      icon_s: getIconSize(ICON_SIZE.S),
      icon_m: getIconSize(ICON_SIZE.M),
      icon_m2: getIconSize(ICON_SIZE.M2),
      icon_l: getIconSize(ICON_SIZE.L),
      icon_xl: getIconSize(ICON_SIZE.XL),
      circle_micro: getCircleStyle(ICON_SIZE.MICRO),
      circle_xxs: getCircleStyle(ICON_SIZE.XXS),
      circle_xs: getCircleStyle(ICON_SIZE.XS),
      circle_s: getCircleStyle(ICON_SIZE.S),
      circle_m: getCircleStyle(ICON_SIZE.M),
      circle_m2: getCircleStyle(ICON_SIZE.M2),
      circle_l: getCircleStyle(ICON_SIZE.L),
      circle_xl: getCircleStyle(ICON_SIZE.XL),
      shadow_xs: {
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
      },
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
      shadow_l: {
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: 20,
        },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 5,
      },
      no_overflow: { overflow: 'hidden' },
      rotate_90: { transform: [{ rotate: '90deg' }] },
      rotate_minus_90: { transform: [{ rotate: '-90deg' }] },
      o_0: { opacity: 0 },
      flx_0: { flex: 0 },
      ba2: { borderWidth: 2 },
      b_white: { borderWidth: 1, borderColor: '#FFFFFF' },
      flx_wrap: { flexWrap: 'wrap' },
      br_12: { borderRadius: 12 }
    },
  },
  StyleSheet,
);
