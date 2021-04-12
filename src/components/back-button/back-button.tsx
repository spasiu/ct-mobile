import React from 'react';
import { Image } from 'react-native';

import { IconButton } from '../icon-button/icon-button';

import { BackButtonProps } from './back-button.props';

const backButton = require('../../assets/arrow-left.png');

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
