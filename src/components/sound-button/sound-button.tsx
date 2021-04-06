import React from 'react';

import { IconButton } from '../icon-button/icon-button';
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
    <IconButton
      image={muted ? volumeOn : volumeOff}
      style={style}
      onPress={onPress}
      {...borderlessButtonProps}
    />
  );
};
