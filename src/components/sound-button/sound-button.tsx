import React from 'react';
import { Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { SoundButtonProps } from './sound-button.props';

const volumeOn = require('../../assets/volume-on.png');
const volumeOff = require('../../assets/volume-off.png');

export const SoundButton = ({
  muted = false,
  style = [],
  onPress = () => {},
  ...borderlessButtonProps
}: SoundButtonProps) => {
  return (
    <BorderlessButton
      style={style}
      onPress={onPress}
      {...borderlessButtonProps}>
      <Image source={muted ? volumeOn : volumeOff} />
    </BorderlessButton>
  );
};
