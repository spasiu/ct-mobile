import { ImageStyle, ImageRequireSource } from 'react-native';

import { ICON_SIZE } from '../../theme/sizes';

export const SOCIAL_ICON_PRESETS = {
  twitter: require('../../assets/twitter-icon.png') as ImageRequireSource,
  facebook: require('../../assets/facebook-icon.png') as ImageRequireSource,
  instagram: require('../../assets/instagram-icon.png') as ImageRequireSource,
  tiktok: require('../../assets/instagram-icon.png') as ImageRequireSource,
  linkedin: require('../../assets/instagram-icon.png') as ImageRequireSource,
};

export const IMAGE_STYLE_PRESET = [
  { width: ICON_SIZE.XXS, height: ICON_SIZE.XXS },
] as ImageStyle[];

export type SocialIconTypes = keyof typeof SOCIAL_ICON_PRESETS;
