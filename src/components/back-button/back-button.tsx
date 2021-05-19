import React from 'react';
import { Image } from 'react-native';

import { IconButton } from '../icon-button/icon-button';

import { BackButtonProps } from './back-button.props';
import { backButton } from './back-button.presets';

export const BackButton = ({
  style = [],
  onPress = () => {},
  ...iconButtonProps
}: BackButtonProps) => {
  return (
    <IconButton style={style} onPress={onPress} {...iconButtonProps}>
      <Image source={backButton} />
    </IconButton>
  );
};
