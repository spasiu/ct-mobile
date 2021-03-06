import { TextStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export const textStylePresets = {
  title: [s.ff_b, s.f3, s.black] as TextStyle[],
  subtitle: [s.ff_alt_r, s.f5, s.mt3, s.black_80, s.lh_high] as TextStyle[],
  wrapper: [s.mt4, s.mb4] as TextStyle[],
};

export const titleWrapperStyle = [s.flx_row, s.jcsb, s.aic];
