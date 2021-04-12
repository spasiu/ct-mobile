import React from 'react';
import { View, Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { styles as s } from 'react-native-style-tachyons';

import { ICON_SIZE } from '../../theme/sizes';

import { AvatarUploadProps } from './avatar-upload.props';

const avatar = require('../../assets/avatar.png');
const cameraIcon = require('../../assets/camera-icon.png');

export const AvatarUpload = ({
  containerStyle = [],
  imageStyle = [],
  onPress = () => {},
}: AvatarUploadProps) => (
  <View
    style={[
      { width: ICON_SIZE.XL, height: ICON_SIZE.XL + ICON_SIZE.M / 4 },
      ...containerStyle,
    ]}>
    <Image
      style={[s.circle_xl, ...imageStyle]}
      resizeMode={'contain'}
      source={avatar}
    />
    <BorderlessButton
      style={[
        s.circle_m,
        s.bg_black_10,
        s.jcc,
        s.aic,
        s.absolute,
        s.bottom_0,
        s.right_0,
      ]}
      onPress={onPress}>
      <Image source={cameraIcon} />
    </BorderlessButton>
  </View>
);
