import React from 'react';
import { View, Text, Image } from 'react-native';

import {
  CONTAINER_STYLE_PRESET,
  IMAGE_STYLE_PRESET,
  TEXT_STYLE_PRESET,
} from './badge.presets';
import { BadgeProps } from './badge.props';

export const Badge = ({
  containerStyle = [],
  image,
  imageStyle = [],
  text = '',
  textStyle = [],
}: BadgeProps) => (
  <View style={[...CONTAINER_STYLE_PRESET, ...containerStyle]}>
    {image && (
      <Image style={[...IMAGE_STYLE_PRESET, ...imageStyle]} source={image} />
    )}
    <Text style={[...TEXT_STYLE_PRESET, ...textStyle]}>{text}</Text>
  </View>
);
