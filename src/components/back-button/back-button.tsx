import React from 'react';
import { Image } from 'react-native';

import { IconButton } from '../icon-button';

import { BackButtonProps } from './back-button.props';
import { backButton } from './back-button.presets';

export const BackButton = ({
  style = [],
  onPress = () => undefined,
  ...iconButtonProps
}: BackButtonProps): JSX.Element => {
  return (
    <IconButton style={style} onPress={onPress} {...iconButtonProps}>
      <Image source={backButton} />
    </IconButton>
  );
};
