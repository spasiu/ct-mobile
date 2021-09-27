import { styles as s } from 'react-native-style-tachyons';

import { COLORS } from '../../theme/colors';

export const checkboxStyle = [s.icon_xxs, s.ml1, s.mt1, s.mr3];

export const checkboxColors = {
  tintColor: COLORS.negative,
  onCheckColor: COLORS.positive,
  onTintColor: COLORS.positive,
};
