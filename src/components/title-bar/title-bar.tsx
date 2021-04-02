import React from 'react';
import { View, Text } from 'react-native';

import { TitleBarProps } from './title-bar.props';
import { textStylePresets } from './title-bar.presets';

export const TitleBar = ({
  title = '',
  subtitle = '',
  titleStyle = [],
  subtitleStyle = [],
  wrapperStyle = [],
}: TitleBarProps) => (
  <View style={[...textStylePresets.wrapper, ...wrapperStyle]}>
    <Text style={[...textStylePresets.title, ...titleStyle]}>{title}</Text>
    <Text style={[...textStylePresets.subtitle, ...subtitleStyle]}>
      {subtitle}
    </Text>
  </View>
);
