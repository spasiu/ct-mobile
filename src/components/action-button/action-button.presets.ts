import { ViewStyle, TextStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { ActionButtonTypes } from './action-button.props';

export const buttonTypes = {
  [ActionButtonTypes.primary]: [s.bg_black] as ViewStyle[],
  [ActionButtonTypes.secondary]: [s.bg_secondary] as ViewStyle[],
  [ActionButtonTypes.tertiary]: [s.ba, s.b__black] as ViewStyle[],
  [ActionButtonTypes.disabled]: [s.bg_black_40] as ViewStyle[],
};

export const baseTextPreset = [s.ff_alt_sb, s.f5] as TextStyle[];

export const textPresets = {
  [ActionButtonTypes.primary]: [...baseTextPreset, s.white] as ViewStyle[],
  [ActionButtonTypes.secondary]: [...baseTextPreset, s.white] as ViewStyle[],
  [ActionButtonTypes.tertiary]: [...baseTextPreset, s.black] as ViewStyle[],
  [ActionButtonTypes.disabled]: [...baseTextPreset, s.white] as ViewStyle[],
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
  [ActionButtonTypes.tertiary]: [
    ...buttonBasePreset,
    ...buttonTypes.tertiary,
  ] as ViewStyle[],
  [ActionButtonTypes.disabled]: [
    ...buttonBasePreset,
    ...buttonTypes.disabled,
  ] as ViewStyle[],
};

export const loadingWrapper = [s.jcc, s.aic, s.mt0];
