import React, { forwardRef } from 'react';
import { View, Text, TextInput, Image } from 'react-native';

import {
  inputWrapperPreset,
  labelTextPreset,
  inputPreset,
  viewPreset,
  containerWrapper,
  errorTextPreset,
  errorIcon,
} from './form-input.presets';
import { FormInputProps, FormInputStatusTypes } from './form-input.props';
import { isStatusError } from './form-input.utils';

export const FormInput = forwardRef(
  (
    {
      label,
      style = [],
      labelStyle = [],
      status = FormInputStatusTypes.default,
      errorMessage,
      containerStyle = [],
      ...textInputProps
    }: FormInputProps,
    ref,
  ): JSX.Element => (
    <View style={[...containerWrapper, ...containerStyle]}>
      <View style={inputWrapperPreset[status]}>
        <View style={viewPreset.textWrapper}>
          {label ? (
            <Text style={[...labelTextPreset.style, ...labelStyle]}>
              {label}
            </Text>
          ) : null}
          <TextInput
            ref={ref}
            autoCapitalize="none"
            autoCorrect={false}
            {...textInputProps}
            style={[...inputPreset[status], ...style]}
          />
        </View>
        {isStatusError(status) ? (
          <View style={viewPreset.iconWrapper}>
            <Image source={errorIcon} />
          </View>
        ) : null}
      </View>
      <Text style={errorTextPreset}>
        {(isStatusError(status) && errorMessage) || ''}
      </Text>
    </View>
  ),
);
