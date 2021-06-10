import React from 'react';
import { Image } from 'react-native';

import { leagueIconPresets, imageStylePreset } from './league-icon.presets';
import { LeagueIconProps } from './league-icon.props';

export const LeagueIcon = ({
  league,
  style = [],
  ...imageProps
}: LeagueIconProps): JSX.Element => (
  <Image
    {...imageProps}
    style={[...imageStylePreset, ...style]}
    source={leagueIconPresets[league]}
    resizeMode={'contain'}
  />
);
