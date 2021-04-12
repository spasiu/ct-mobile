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
  ...imageCardProps
}: BreakerCardProps) => (
  <ImageCard cardSize="medium" {...imageCardProps}>
    <LinearGradient {...GRADIENT_PRESETS}>
      <View
        style={[...CONTENT_CONTAINER_STYLE_PRESET, ...contentContainerStyle]}>
        <Text style={[...TITLE_STYLE_PRESET, ...titleTextStyle]}>{title}</Text>
        <Text
          style={[...DESCRIPTION_STYLE_PRESET, ...descriptionTextStyle]}
          numberOfLines={2}
          ellipsizeMode={'tail'}>
          {description}
        </Text>
      </View>
    </LinearGradient>
  </ImageCard>
);
