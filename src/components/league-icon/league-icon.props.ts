import { ImageProps, ImageStyle } from 'react-native';

import { Sports } from '../../common/sports';

export interface LeagueIconProps extends Omit<ImageProps, 'source'> {
  league: keyof typeof Sports;
  style?: ImageStyle[];
}
