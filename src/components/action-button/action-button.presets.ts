import { ViewStyle, TextStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export const buttonTypes = {
  primary: [s.bg_black] as ViewStyle[],
  secondary: [s.bg_secondary] as ViewStyle[],
  disabled: [s.bg_black_40] as ViewStyle[],
};

export const textPresets = {
  style: [s.ff_alt_sb, s.f5, s.white] as TextStyle[],
};

export const viewPresets = {
  style: [s.flx_i, s.flx_row, s.aic, s.jcc],
};

export const BUTTON_BASE_PRESET = [s.w_100, s.h3, s.br4, s.jcc, s.aic];

export const rectButtonPresets = {
  primary: [...BUTTON_BASE_PRESET, ...buttonTypes.primary] as ViewStyle[],
  secondary: [...BUTTON_BASE_PRESET, ...buttonTypes.secondary] as ViewStyle[],
  disabled: [...BUTTON_BASE_PRESET, ...buttonTypes.disabled] as ViewStyle[],
};

export const isDisabled = (type: ActionButtonTypes) => type === 'disabled';

export type ActionButtonTypes = keyof typeof buttonTypes;
