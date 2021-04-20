import React from 'react';
import { View, Text } from 'react-native';

import { ImageCard } from '../image-card/image-card';

import { HitCardProps } from './hit-card.props';
import { TITLE_PRESETS, CONTAINER_PRESETS } from './hit-card.presets';

export const HitCard = ({
  title = '',
  containerStyle = [],
  textStyle = [],
  ...imageCardProps
}: HitCardProps) => (
  <View style={[...CONTAINER_PRESETS, ...containerStyle]}>
    <ImageCard cardSize="small" {...imageCardProps} />
    <Text style={[...TITLE_PRESETS, ...textStyle]}>{title}</Text>
  </View>
);