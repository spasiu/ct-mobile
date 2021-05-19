import React from 'react';
import { View, Text, Image } from 'react-native';

import {
  containerStylePreset,
  imageStylePreset,
  textStylePreset,
} from './badge.presets';
import { BadgeProps } from './badge.props';

export const Badge = ({
  containerStyle = [],
  image,
  imageStyle = [],
  text = '',
  textStyle = [],
}: BadgeProps) => (
  <View style={[...containerStylePreset, ...containerStyle]}>
    {image && (
      <Image style={[...imageStylePreset, ...imageStyle]} source={image} />
    )}
    <Text style={[...textStylePreset, ...textStyle]}>{text}</Text>
  </View>
);
