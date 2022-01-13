import React, { useRef } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ActionSheet from 'react-native-actionsheet';

import { Loading } from '../loading';
import { ServerImage } from '../server-image';

import { AvatarUploadProps } from './avatar-upload.props';
import {
  avatar,
  cameraIcon,
  viewContainerStyle,
  imageSizeStyle,
  borderlessButtonStyle,
  loadingWrapper,
  CAMERA_CONFIG,
  ACTION_SHEET_OPTIONS,
  AVATAR_DIMENSIONS,
  errorTextPreset,
  errorBorderStyle,
} from './avatar-upload.presets';

export const AvatarUpload = ({
  containerStyle = [],
  imageStyle = [],
  onNewImageSelected = () => undefined,
  image,
  isLoading = false,
  errorMessage = '',
}: AvatarUploadProps): JSX.Element => {
  const actionSheetRef = useRef() as React.MutableRefObject<ActionSheet>;
  const AvatarImage = image ? (
    <ServerImage
      style={[...imageSizeStyle, ...imageStyle]}
      src={image}
      width={AVATAR_DIMENSIONS.width}
      height={AVATAR_DIMENSIONS.height}
      fit="facearea"
    />
  ) : (
    <Image
      style={[...imageSizeStyle, ...imageStyle]}
      resizeMode={'cover'}
      source={avatar}
    />
  );

  return (
    <View
      style={[
        ...viewContainerStyle,
        ...containerStyle,
        errorMessage ? errorBorderStyle : {},
      ]}>
      {isLoading ? <Loading containerStyle={loadingWrapper} /> : AvatarImage}
      <BorderlessButton
        style={borderlessButtonStyle}
        onPress={() => {
          if (actionSheetRef && actionSheetRef.current) {
            actionSheetRef.current.show();
          }
        }}>
        <Image source={cameraIcon} />
      </BorderlessButton>
      <ActionSheet
        ref={actionSheetRef}
        options={ACTION_SHEET_OPTIONS}
        cancelButtonIndex={2}
        onPress={index => {
          if (index === 0) {
            launchCamera(CAMERA_CONFIG, async response => {
              if (response.uri) {
                onNewImageSelected(response);
              }
            });
          } else if (index === 1) {
            launchImageLibrary(CAMERA_CONFIG, async response => {
              if (response.uri) {
                onNewImageSelected(response);
              }
            });
          }
        }}
      />
      <View>
        <Text style={errorTextPreset}>{errorMessage || ''}</Text>
      </View>
    </View>
  );
};
