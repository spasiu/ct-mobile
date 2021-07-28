import React from 'react';
import { View, Text } from 'react-native';

import { ImageCard } from '../image-card';

import { HitCardProps } from './hit-card.props';
import { titlePresets, containerPresets } from './hit-card.presets';

export const HitCard = ({
  title = '',
  containerStyle = [],
  textStyle = [],
  cardStyle = [],
  cardWidth,
  cardHeight,
  showTitle = true,
  ...imageCardProps
}: HitCardProps): JSX.Element => (
  <View style={[...containerPresets, ...containerStyle]}>
    <ImageCard
      {...imageCardProps}
      cardWidth={cardWidth}
      cardHeight={cardHeight}
      containerStyle={cardStyle}
    />
    {showTitle ? (
      <Text
        numberOfLines={3}
        ellipsizeMode={'tail'}
        style={[...titlePresets, ...textStyle]}>
        {title}
      </Text>
    ) : null}
  </View>
);
