import React from 'react';
import { View, Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { AvatarUploadProps } from './avatar-upload.props';
import {
  avatar,
  cameraIcon,
  viewContainerStyle,
  imageSizeStyle,
  borderlessButtonStyle,
} from './avatar-upload.presets';

export const AvatarUpload = ({
  containerStyle = [],
  imageStyle = [],
  onPress = () => {},
}: AvatarUploadProps) => (
  <View style={[...viewContainerStyle, ...containerStyle]}>
    <Image
      style={[...imageSizeStyle, ...imageStyle]}
      resizeMode={'contain'}
      source={avatar}
    />
    <BorderlessButton style={borderlessButtonStyle} onPress={onPress}>
      <Image source={cameraIcon} />
    </BorderlessButton>
  </View>
);
