import { ImageProps, ImageStyle } from 'react-native';

import { SocialIconTypes } from './social-icon.presets';

export interface SocialIconProps extends Omit<ImageProps, 'source'> {
  name: SocialIconTypes;
  style?: ImageStyle[];
}
