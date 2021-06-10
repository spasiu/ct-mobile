import React from 'react';
import { View, ImageBackground } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
  shadowContainerPreset,
  containerPreset,
  imageBackgroundPreset,
} from './image-card.presets';
import { ImageCardProps, ImageCardSizeTypes } from './image-card.props';

const loadingImage = require('../../assets/baseball-icon.png');

export const ImageCard = ({
  children,
  cardSize = ImageCardSizeTypes.medium,
  image,
  onPress = () => undefined,
  touchable = true,
  containerStyle = [],
}: ImageCardProps): JSX.Element => {
  const imageCard = (
    <View style={shadowContainerPreset} accessible>
      <View style={[...containerPreset[cardSize], ...containerStyle]}>
        <ImageBackground
          loadingIndicatorSource={loadingImage}
          style={imageBackgroundPreset}
          resizeMode={'cover'}
          source={image}>
          {children}
        </ImageBackground>
      </View>
    </View>
  );
  return touchable ? (
    <BorderlessButton onPress={onPress}>{imageCard}</BorderlessButton>
  ) : (
    imageCard
  );
};
