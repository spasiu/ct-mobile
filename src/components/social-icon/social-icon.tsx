import React from 'react';
import { Image } from 'react-native';

import { socialIconPresets, imageStylePresets } from './social-icon.presets';
import { SocialIconProps } from './social-icon.props';

export const SocialIcon = ({
  name,
  style = [],
  ...imageProps
}: SocialIconProps): JSX.Element => (
  <Image
    {...imageProps}
    style={[...imageStylePresets, ...style]}
    source={socialIconPresets[name]}
    resizeMode={'contain'}
  />
);
