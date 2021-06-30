import React, { forwardRef, LegacyRef } from 'react';
import { View, Text, TextInput, Image } from 'react-native';

import { COLORS } from '../../theme/colors';

import { Tooltip } from '../tooltip';

import {
  inputWrapperPreset,
  labelTextPreset,
  inputPreset,
  viewPreset,
  containerWrapper,
  errorTextPreset,
  errorIcon,
  errorIconPreset,
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
      inputStyle = [],
      showTooltip = false,
      tooltipText = '',
      ...textInputProps
    }: FormInputProps,
    ref: LegacyRef<TextInput>,
  ): JSX.Element => (
    <View style={[...containerWrapper, ...containerStyle]}>
      <View style={[...inputWrapperPreset[status], ...inputStyle]}>
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
            placeholderTextColor={COLORS.black}
            {...textInputProps}
            style={[...inputPreset[status], ...style]}
          />
        </View>
        {isStatusError(status) || showTooltip ? (
          <Tooltip text={tooltipText} enabled={showTooltip}>
            <View style={viewPreset.iconWrapper}>
              <Image
                style={errorIconPreset}
                resizeMode={'contain'}
                source={errorIcon}
              />
            </View>
          </Tooltip>
        ) : null}
      </View>
      <Text style={errorTextPreset}>
        {(isStatusError(status) && errorMessage) || ''}
      </Text>
    </View>
  ),
);
