import React from 'react';
import { View, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import {
  SHADOW_CONTAINER_PRESET,
  CONTAINER_PRESET,
  IMAGE_BACKGROUND_PRESET,
} from './image-card.presets';
import { ImageCardProps } from './image-card.props';

export const ImageCard = ({
  children,
  cardSize = 'medium',
  image,
  onPress = () => {},
  touchable = true,
  containerStyle = [],
}: ImageCardProps) => {
  const imageCard = (
    <View style={SHADOW_CONTAINER_PRESET} accessible>
      <View style={[...CONTAINER_PRESET[cardSize], ...containerStyle]}>
        <ImageBackground
          style={IMAGE_BACKGROUND_PRESET}
          resizeMode={'cover'}
          source={image}>
          {children}
        </ImageBackground>
      </View>
    </View>
  );
  return touchable ? (
    <RectButton onPress={onPress}>{imageCard}</RectButton>
  ) : (
    imageCard
  );
};
