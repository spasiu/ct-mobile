import NativeTachyons from 'react-native-style-tachyons';
import { StyleSheet } from 'react-native';

import { getRootRem } from './utils';
import { colors } from './colors';

NativeTachyons.build(
  {
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
    },
  },
  StyleSheet,
);
