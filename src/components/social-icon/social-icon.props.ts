import { ImageProps, ImageStyle } from 'react-native';

export enum SocialIconTypes {
  twitter = 'twitter',
  facebook = 'facebook',
  instagram = 'instagram',
  tiktok = 'tiktok',
}
export interface SocialIconProps extends Omit<ImageProps, 'source'> {
  name: keyof typeof SocialIconTypes;
  style?: ImageStyle[];
}
