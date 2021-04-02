import { ViewStyle, TextStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export const BASE_INPUT_WRAPPER_PRESET = [
  s.w_100,
  s.h3,
  s.flx_row,
  s.ba,
  s.ph3,
  s.pv2,
  s.br4,
  s.mb3,
];

export const BASE_INPUT_PRESET = [s.flx_i, s.ff_alt_r, s.f5];

export const inputWrapperPreset = {
  active: [...BASE_INPUT_WRAPPER_PRESET, s.b__woodsmoke] as ViewStyle[],
  disabled: [...BASE_INPUT_WRAPPER_PRESET, s.b__mercury] as ViewStyle[],
  error: [...BASE_INPUT_WRAPPER_PRESET, s.b__pomegranate] as ViewStyle[],
  default: [...BASE_INPUT_WRAPPER_PRESET, s.b__mercury] as ViewStyle[],
};

export const labelTextPreset = {
  style: [s.ff_alt_r, s.abbey, s.f6] as TextStyle[],
};

export const inputPreset = {
  active: [...BASE_INPUT_PRESET, s.woodsmoke] as TextStyle[],
  disabled: [...BASE_INPUT_PRESET, s.abbey] as TextStyle[],
  error: [...BASE_INPUT_PRESET, s.woodsmoke] as TextStyle[],
  default: [...BASE_INPUT_PRESET, s.woodsmoke] as TextStyle[],
};

export const viewPreset = {
  textWrapper: [s.flx_i] as ViewStyle[],
  iconWrapper: [s.flx_ratio(0.15), s.jcc, s.aife] as ViewStyle[],
};

export type FormInputStatusTypes = keyof typeof inputPreset;
