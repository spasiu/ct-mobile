import React from 'react';
import { Image } from 'react-native';

import { LEAGUE_ICON_PRESETS, IMAGE_STYLE_PRESET } from './league-icon.presets';
import { LeagueIconProps } from './league-icon.props';

export const LeagueIcon = ({
  league,
  style = [],
  ...imageProps
}: LeagueIconProps) => (
  <Image
    {...imageProps}
    style={[...IMAGE_STYLE_PRESET, ...style]}
    source={LEAGUE_ICON_PRESETS[league]}
    resizeMode={'contain'}
  />
);
