import React from 'react';
import RNCheckBox, { CheckBoxProps } from '@react-native-community/checkbox';

import { checkboxStyle, checkboxColors } from './checkbox.presets';

export const CheckBox = (props: CheckBoxProps): JSX.Element => (
  <RNCheckBox
    {...props}
    {...checkboxColors}
    boxType={'square'}
    style={checkboxStyle}
  />
);
