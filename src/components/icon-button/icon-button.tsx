import React from 'react';
import { Image, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { IconButtonProps } from './icon-button.props';

export const IconButton = ({
  image,
  style = [],
  onPress = () => {},
  ...borderlessButtonProps
}: IconButtonProps) => {
  return (
    <BorderlessButton
      style={style}
      onPress={onPress}
      {...borderlessButtonProps}>
      <View accessible>
        <Image source={image} />
      </View>
    </BorderlessButton>
  );
};
