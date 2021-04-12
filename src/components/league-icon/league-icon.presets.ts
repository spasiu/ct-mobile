import { ImageStyle, ImageRequireSource } from 'react-native';

import { ICON_SIZE } from '../../theme/sizes';

export const LEAGUE_ICON_PRESETS = {
  baseball: require('../../assets/baseball-icon.png') as ImageRequireSource,
  basketball: require('../../assets/basketball-icon.png') as ImageRequireSource,
  football: require('../../assets/football-icon.png') as ImageRequireSource,
  soccer: require('../../assets/soccer-icon.png') as ImageRequireSource,
  hockey: require('../../assets/hockey-icon.png') as ImageRequireSource,
};

export const IMAGE_STYLE_PRESET = [
  { width: ICON_SIZE.XS, height: ICON_SIZE.XS },
] as ImageStyle[];

export type LeagueIconTypes = keyof typeof LEAGUE_ICON_PRESETS;
