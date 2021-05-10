import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ImageCard } from '../image-card/image-card';

import { BreakerCardProps } from './breaker-card.props';
import {
  GRADIENT_PRESETS,
  CONTENT_CONTAINER_STYLE_PRESET,
  TITLE_STYLE_PRESET,
  DESCRIPTION_STYLE_PRESET,
} from './breaker-card.presets';

export const BreakerCard = ({
  title = '',
  description = '',
  titleTextStyle = [],
  descriptionTextStyle = [],
  contentContainerStyle = [],
  cardSize = 'medium',
  ...imageCardProps
}: BreakerCardProps) => (
  <ImageCard cardSize={cardSize} {...imageCardProps}>
    <LinearGradient {...GRADIENT_PRESETS}>
      <View
        style={[...CONTENT_CONTAINER_STYLE_PRESET, ...contentContainerStyle]}>
        <Text style={[...TITLE_STYLE_PRESET[cardSize], ...titleTextStyle]}>
          {title}
        </Text>
        <Text
          style={[
            ...DESCRIPTION_STYLE_PRESET[cardSize],
            ...descriptionTextStyle,
          ]}
          numberOfLines={2}
          ellipsizeMode={'tail'}>
          {description}
        </Text>
      </View>
    </LinearGradient>
  </ImageCard>
);
