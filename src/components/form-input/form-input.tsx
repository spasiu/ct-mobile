import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';

import {
  inputWrapperPreset,
  labelTextPreset,
  inputPreset,
  viewPreset,
} from './form-input.presets';
import { FormInputProps } from './form-input.props';

const errorIcon = require('../../assets/input-error-icon.png');

export const FormInput = ({
  label = '',
  style = [],
  labelStyle = [],
  status = 'default',
  ...textInputProps
}: FormInputProps) => (
  <View style={inputWrapperPreset[status]}>
    <View style={viewPreset.textWrapper}>
      <Text style={[...labelTextPreset.style, ...labelStyle]}>{label}</Text>
      <TextInput
        {...textInputProps}
        style={[...inputPreset[status], ...style]}
      />
    </View>
    {status === 'error' && (
      <View style={viewPreset.iconWrapper}>
        <Image source={errorIcon} />
      </View>
    )}
  </View>
);
