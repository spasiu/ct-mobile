import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export const appleLogo = require('../../assets/apple-logo.png');

export const buttonStyle = [s.badge_height, s.w_100, s.br3] as ViewStyle[];

export const textStyle = [s.f7] as TextStyle[];

export const imageStyle = [s.icon_micro, s.tint_white, s.mr1] as ImageStyle[];
