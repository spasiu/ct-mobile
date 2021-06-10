import { ImageStyle, ImageRequireSource } from 'react-native';

import { ICON_SIZE } from '../../theme/sizes';

import { SocialIconTypes } from './social-icon.props';

export const socialIconPresets = {
  [SocialIconTypes.twitter]: require('../../assets/twitter-icon.png') as ImageRequireSource,
  [SocialIconTypes.facebook]: require('../../assets/facebook-icon.png') as ImageRequireSource,
  [SocialIconTypes.instagram]: require('../../assets/instagram-icon.png') as ImageRequireSource,
  [SocialIconTypes.tiktok]: require('../../assets/instagram-icon.png') as ImageRequireSource,
};

export const imageStylePresets = [
  { width: ICON_SIZE.XXS, height: ICON_SIZE.XXS },
] as ImageStyle[];
