import React from 'react';
import { Image } from 'react-native';

import { SOCIAL_ICON_PRESETS, IMAGE_STYLE_PRESET } from './social-icon.presets';
import { SocialIconProps } from './social-icon.props';

export const SocialIcon = ({
  name,
  style = [],
  ...imageProps
}: SocialIconProps) => (
  <Image
    {...imageProps}
    style={[...IMAGE_STYLE_PRESET, ...style]}
    source={SOCIAL_ICON_PRESETS[name]}
    resizeMode={'contain'}
  />
);
