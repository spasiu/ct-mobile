import { ImageStyle, ImageRequireSource } from 'react-native';

import { ICON_SIZE } from '../../theme/sizes';
import { Sports } from '../../common/sports';

export const leagueIconPresets = {
  [Sports.baseball]: require('../../assets/baseball-icon.png') as ImageRequireSource,
  [Sports.basketball]: require('../../assets/basketball-icon.png') as ImageRequireSource,
  [Sports.football]: require('../../assets/football-icon.png') as ImageRequireSource,
  [Sports.soccer]: require('../../assets/soccer-icon.png') as ImageRequireSource,
  [Sports.hockey]: require('../../assets/hockey-icon.png') as ImageRequireSource,
};

export const imageStylePreset = [
  { width: ICON_SIZE.XS, height: ICON_SIZE.XS },
] as ImageStyle[];
