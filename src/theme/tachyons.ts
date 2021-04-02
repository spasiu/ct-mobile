import NativeTachyons from 'react-native-style-tachyons';
import { StyleSheet } from 'react-native';

import { getRootRem } from './utils';
import { colors } from './colors';

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
      palette: colors,
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
    },
  },
  StyleSheet,
);
