import React from 'react';
import { Image } from 'react-native';
import { Sports } from '../../common/sports';

import { leagueIconPresets, imageStylePreset } from './league-icon.presets';
import { LeagueIconProps } from './league-icon.props';

export const LeagueIcon = ({
  league = '',
  style = [],
  ...imageProps
}: LeagueIconProps): JSX.Element | null => {
  if (!league || !leagueIconPresets[league as Sports]) {
    return null;
  }

  return (
    <Image
      {...imageProps}
      style={[...imageStylePreset, ...style]}
      source={leagueIconPresets[league as Sports]}
      resizeMode={'contain'}
    />
  );
};
