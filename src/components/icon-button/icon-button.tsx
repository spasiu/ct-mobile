import React from 'react';
import { View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { IconButtonProps } from './icon-button.props';

export const IconButton = ({
  children,
  style = [],
  onPress = () => {},
  ...borderlessButtonProps
}: IconButtonProps) => {
  return (
    <BorderlessButton
      style={style}
      onPress={onPress}
      {...borderlessButtonProps}>
      <View accessible>{children}</View>
    </BorderlessButton>
  );
};
