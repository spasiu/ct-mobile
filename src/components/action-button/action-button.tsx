import React from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { ActionButtonProps, ActionButtonTypes } from './action-button.props';
import {
  borderlessButtonPresets,
  textPresets,
  viewPresets,
} from './action-button.presets';
import { isDisabled } from './action-button.utils';

export const ActionButton = ({
  text = '',
  style = [],
  textStyle = [],
  onPress = () => {},
  buttonType = ActionButtonTypes.primary,
  children,
  ...borderlessButtonProps
}: ActionButtonProps) => {
  return (
    <BorderlessButton
      style={[...borderlessButtonPresets[buttonType], ...style]}
      onPress={event => !isDisabled(buttonType) && onPress(event)}
      {...borderlessButtonProps}>
      <View accessible style={viewPresets.style}>
        {children}
        <Text style={[...textPresets.style, ...textStyle]}>{text}</Text>
      </View>
    </BorderlessButton>
  );
};
