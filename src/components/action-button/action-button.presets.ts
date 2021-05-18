import { ViewStyle, TextStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { ActionButtonTypes } from './action-button.props';

export const buttonTypes = {
  [ActionButtonTypes.primary]: [s.bg_black] as ViewStyle[],
  [ActionButtonTypes.secondary]: [s.bg_secondary] as ViewStyle[],
  [ActionButtonTypes.disabled]: [s.bg_black_40] as ViewStyle[],
};

export const textPresets = {
  style: [s.ff_alt_sb, s.f5, s.white] as TextStyle[],
};

export const viewPresets = {
  style: [s.flx_i, s.flx_row, s.aic, s.jcc] as ViewStyle[],
};

export const buttonBasePreset = [
  s.w_100,
  s.h3,
  s.br4,
  s.jcc,
  s.aic,
] as ViewStyle[];

export const borderlessButtonPresets = {
  [ActionButtonTypes.primary]: [
    ...buttonBasePreset,
    ...buttonTypes.primary,
  ] as ViewStyle[],
  [ActionButtonTypes.secondary]: [
    ...buttonBasePreset,
    ...buttonTypes.secondary,
  ] as ViewStyle[],
  [ActionButtonTypes.disabled]: [
    ...buttonBasePreset,
    ...buttonTypes.disabled,
  ] as ViewStyle[],
};
