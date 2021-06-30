import { TextStyle, ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { SelectableRowTypes } from './selectable-row.props';

export const checkIcon = require('../../assets/check-icon.png');

export const containerPreset = [
  s.flx_row,
  s.bg_white,
  s.ph3,
  s.pv3,
  s.br4,
] as ViewStyle[];

export const leftWrapperPreset = [s.flx_ratio(0.2)] as ViewStyle[];

const baseCheckboxStyle = [s.circle_s];

export const checkboxPreset = {
  [SelectableRowTypes.default]: [
    ...baseCheckboxStyle,
    s.bg_white,
    s.ba,
    s.b__black_40,
  ],
  [SelectableRowTypes.selected]: [
    ...baseCheckboxStyle,
    s.jcc,
    s.aic,
    s.bg_black,
  ],
};

export const childrenWrapperPreset = [s.flx_i] as ViewStyle[];

export const actionWrapperPreset = [
  s.flx_ratio(0.3),
  s.aife,
  s.jcfs,
] as ViewStyle[];

export const actionTextStyle = [s.ff_alt_r, s.f5] as TextStyle[];
