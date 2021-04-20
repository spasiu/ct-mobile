import React from 'react';
import RNCheckBox from '@react-native-community/checkbox';
import { styles as s } from 'react-native-style-tachyons';

import { COLORS } from '../../theme/colors';

export const CheckBox = () => (
  <RNCheckBox
    tintColor={COLORS.negative}
    onCheckColor={COLORS.positive}
    onTintColor={COLORS.positive}
    boxType={'square'}
    style={[s.icon_xxs, s.ml1]}
  />
);
