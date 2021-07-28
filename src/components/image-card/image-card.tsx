import React from 'react';
import { View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { ServerImage } from '../server-image';

import {
  shadowContainerPreset,
  containerPreset,
  imageBackgroundPreset,
  CARD_SIZES,
} from './image-card.presets';
import { ImageCardProps, ImageCardSizeTypes } from './image-card.props';

export const ImageCard = ({
  children,
  cardSize = ImageCardSizeTypes.medium,
  cardWidth,
  cardHeight,
  image,
  onPress = () => undefined,
  touchable = true,
  containerStyle = [],
}: ImageCardProps): JSX.Element => {
  const cardDimensions = {
    width: cardWidth || CARD_SIZES[cardSize].width,
    height: cardHeight || CARD_SIZES[cardSize].height,
  };
  const imageCard = (
    <View style={shadowContainerPreset} accessible>
      <View
        style={[
          ...containerPreset[cardSize],
          cardDimensions,
          ...containerStyle,
        ]}>
        <ServerImage
          {...cardDimensions}
          src={image}
          style={imageBackgroundPreset}
          resizeMode={'contain'}>
          {children}
        </ServerImage>
      </View>
    </View>
  );
  return touchable ? (
    <BorderlessButton onPress={onPress}>{imageCard}</BorderlessButton>
  ) : (
    imageCard
  );
};
