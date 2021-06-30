import { ImageStyle, ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { ImageLibraryOptions } from 'react-native-image-picker';

import { ICON_SIZE } from '../../theme/sizes';

export const avatar = require('../../assets/avatar.png');
export const cameraIcon = require('../../assets/camera-icon.png');

export const viewContainerStyle = [
  { width: ICON_SIZE.XL, height: ICON_SIZE.XL + ICON_SIZE.M / 4 },
] as ViewStyle[];

export const imageSizeStyle = [s.circle_xl] as ImageStyle[];

export const borderlessButtonStyle = [
  s.circle_m,
  s.bg_black_10,
  s.jcc,
  s.aic,
  s.absolute,
  s.bottom_0,
  s.right_0,
] as ViewStyle[];

export const loadingWrapper = [s.jcc, s.aic, s.mt0];

export const CAMERA_CONFIG: ImageLibraryOptions = {
  mediaType: 'photo',
  maxWidth: 180,
  maxHeight: 180,
};
