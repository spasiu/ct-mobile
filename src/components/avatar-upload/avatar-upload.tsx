import React from 'react';
import { View, Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Loading } from '../loading';

import { AvatarUploadProps } from './avatar-upload.props';
import {
  avatar,
  cameraIcon,
  viewContainerStyle,
  imageSizeStyle,
  borderlessButtonStyle,
  loadingWrapper,
} from './avatar-upload.presets';

export const AvatarUpload = ({
  containerStyle = [],
  imageStyle = [],
  onPress = () => undefined,
  image,
  isLoading = false,
}: AvatarUploadProps): JSX.Element => (
  <View style={[...viewContainerStyle, ...containerStyle]}>
    {isLoading ? (
      <Loading containerStyle={loadingWrapper} />
    ) : (
      <Image
        style={[...imageSizeStyle, ...imageStyle]}
        resizeMode={'cover'}
        source={(image && { uri: image }) || avatar}
      />
    )}
    <BorderlessButton style={borderlessButtonStyle} onPress={onPress}>
      <Image source={cameraIcon} />
    </BorderlessButton>
  </View>
);
