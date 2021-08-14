import { ImageProps, ImageStyle } from 'react-native';

import { Sports } from '../../common/sports';

export interface LeagueIconProps extends Omit<ImageProps, 'source'> {
  league: typeof Sports[keyof typeof Sports] | string;
  style?: ImageStyle[];
}
