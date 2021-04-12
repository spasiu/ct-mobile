import React from 'react';
import { Image } from 'react-native';

import { IconButton } from '../icon-button/icon-button';
import { SoundButtonProps } from './sound-button.props';

const volumeOn = require('../../assets/volume-on.png');
const volumeOff = require('../../assets/volume-off.png');

export const SoundButton = ({
  muted = false,
  style = [],
  onPress = () => {},
  ...iconButtonProps
}: SoundButtonProps) => {
  return (
    <IconButton style={style} onPress={onPress} {...iconButtonProps}>
      <Image source={muted ? volumeOn : volumeOff} />
    </IconButton>
  );
};
