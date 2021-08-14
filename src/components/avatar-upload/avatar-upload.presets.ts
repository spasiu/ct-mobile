import { ImageStyle, ViewStyle } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { ImageLibraryOptions } from 'react-native-image-picker';

import { ICON_SIZE } from '../../theme/sizes';
import { t } from '../../i18n/i18n';

export const avatar = require('../../assets/avatar.png');
export const cameraIcon = require('../../assets/camera-icon.png');

export const AVATAR_DIMENSIONS = {
  width: 180,
  height: 180,
};

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
  maxWidth: AVATAR_DIMENSIONS.width,
  maxHeight: AVATAR_DIMENSIONS.height,
};

export const ACTION_SHEET_OPTIONS = [
  t('buttons.camera'),
  t('buttons.imageLibrary'),
  t('buttons.cancel'),
];
