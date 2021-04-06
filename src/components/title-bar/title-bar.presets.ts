import { TextStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export const textStylePresets = {
  title: [s.ff_b, s.f3, s.black] as TextStyle[],
  subtitle: [s.ff_alt_r, s.f5, s.mt3, s.black_80] as TextStyle[],
  wrapper: [s.w_100, s.mv4] as TextStyle[],
};
