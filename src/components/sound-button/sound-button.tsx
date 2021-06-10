import React from 'react';
import { Image } from 'react-native';

import { IconButton } from '../icon-button';

import { volumeOff, volumeOn } from './sound-button.presets';
import { SoundButtonProps } from './sound-button.props';

export const SoundButton = ({
  muted = false,
  style = [],
  onPress = () => undefined,
  ...iconButtonProps
}: SoundButtonProps): JSX.Element => {
  return (
    <IconButton style={style} onPress={onPress} {...iconButtonProps}>
      <Image source={muted ? volumeOn : volumeOff} />
    </IconButton>
  );
};
