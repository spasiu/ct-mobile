import React from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { ActionButtonProps } from './action-button.props';
import {
  rectButtonPresets,
  textPresets,
  viewPresets,
  isDisabled,
} from './action-button.presets';

export const ActionButton = ({
  text = '',
  style = [],
  textStyle = [],
  onPress = () => {},
  buttonType = 'primary',
  children,
  ...rectButtonProps
}: ActionButtonProps) => {
  return (
    <BorderlessButton
      style={[...rectButtonPresets[buttonType], ...style]}
      onPress={event => !isDisabled(buttonType) && onPress(event)}
      {...rectButtonProps}>
      <View accessible style={viewPresets.style}>
        {children}
        <Text style={[...textPresets.style, ...textStyle]}>{text}</Text>
      </View>
    </BorderlessButton>
  );
};
