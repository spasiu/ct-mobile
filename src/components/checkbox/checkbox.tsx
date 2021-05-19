import React from 'react';
import RNCheckBox, { CheckBoxProps } from '@react-native-community/checkbox';

import { checkboxStyle, checkboxColors } from './checkbox.presets';

export const CheckBox = (props: CheckBoxProps) => (
  <RNCheckBox
    {...props}
    {...checkboxColors}
    boxType={'square'}
    style={checkboxStyle}
  />
);
