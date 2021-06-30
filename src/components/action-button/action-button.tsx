import React from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Loading } from '../loading';

import { ActionButtonProps, ActionButtonTypes } from './action-button.props';
import {
  borderlessButtonPresets,
  textPresets,
  viewPresets,
  loadingWrapper,
} from './action-button.presets';
import { isDisabled } from './action-button.utils';

export const ActionButton = ({
  text = '',
  style = [],
  textStyle = [],
  onPress = () => undefined,
  buttonType = ActionButtonTypes.primary,
  children,
  isLoading = false,
  ...borderlessButtonProps
}: ActionButtonProps): JSX.Element => {
  return (
    <BorderlessButton
      style={[...borderlessButtonPresets[buttonType], ...style]}
      onPress={event => !isDisabled(buttonType, isLoading) && onPress(event)}
      enabled={!isDisabled(buttonType, isLoading)}
      {...borderlessButtonProps}>
      {isLoading ? (
        <Loading containerStyle={loadingWrapper} />
      ) : (
        <View accessible style={viewPresets.style}>
          {children}
          <Text style={[...textPresets[buttonType], ...textStyle]}>{text}</Text>
        </View>
      )}
    </BorderlessButton>
  );
};
