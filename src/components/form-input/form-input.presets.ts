import { ViewStyle, TextStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { FormInputStatusTypes } from './form-input.props';

export const errorIcon = require('../../assets/input-error-icon.png');

export const containerWrapper = [s.flx_i, s.mb3] as ViewStyle[];

export const baseInputWrapperPreset = [
  s.w_100,
  s.h3,
  s.flx_row,
  s.ba,
  s.ph3,
  s.pv2,
  s.br4,
] as ViewStyle[];

export const baseInputPreset = [
  s.flx_i,
  s.ff_alt_r,
  s.f5,
  s.jcc,
] as TextStyle[];

export const inputWrapperPreset = {
  [FormInputStatusTypes.active]: [
    ...baseInputWrapperPreset,
    s.b__black,
  ] as ViewStyle[],
  [FormInputStatusTypes.disabled]: [
    ...baseInputWrapperPreset,
    s.b__black_10,
  ] as ViewStyle[],
  [FormInputStatusTypes.error]: [
    ...baseInputWrapperPreset,
    s.b__negative,
  ] as ViewStyle[],
  [FormInputStatusTypes.default]: [
    ...baseInputWrapperPreset,
    s.b__black_10,
  ] as ViewStyle[],
};

export const labelTextPreset = {
  style: [s.ff_alt_r, s.black_80, s.f6] as TextStyle[],
};

export const inputPreset = {
  [FormInputStatusTypes.active]: [...baseInputPreset, s.black] as TextStyle[],
  [FormInputStatusTypes.disabled]: [
    ...baseInputPreset,
    s.black_80,
  ] as TextStyle[],
  [FormInputStatusTypes.error]: [...baseInputPreset, s.black] as TextStyle[],
  [FormInputStatusTypes.default]: [...baseInputPreset, s.black] as TextStyle[],
};

export const viewPreset = {
  textWrapper: [s.flx_i] as ViewStyle[],
  iconWrapper: [s.jcc, s.aic, s.asc] as ViewStyle[],
};

export const errorIconPreset = [s.flx_i];

export const errorTextPreset = [s.ff_alt_r, s.f7, s.black, s.mt1, s.h1];
