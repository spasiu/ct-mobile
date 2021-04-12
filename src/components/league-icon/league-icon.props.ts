import { ImageProps, ImageStyle } from 'react-native';

import { LeagueIconTypes } from './league-icon.presets';

export interface LeagueIconProps extends Omit<ImageProps, 'source'> {
  league: LeagueIconTypes;
  style?: ImageStyle[];
}
