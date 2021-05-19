import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ImageCard } from '../image-card/image-card';

import { BreakerCardProps } from './breaker-card.props';
import {
  gradientPresets,
  contentContainerStylePreset,
  titleStylePreset,
  descriptionStylePreset,
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
    <LinearGradient {...gradientPresets}>
      <View style={[...contentContainerStylePreset, ...contentContainerStyle]}>
        <Text style={[...titleStylePreset[cardSize], ...titleTextStyle]}>
          {title}
        </Text>
        <Text
          style={[...descriptionStylePreset[cardSize], ...descriptionTextStyle]}
          numberOfLines={2}
          ellipsizeMode={'tail'}>
          {description}
        </Text>
      </View>
    </LinearGradient>
  </ImageCard>
);
