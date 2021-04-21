import React from 'react';
import { View, Text } from 'react-native';

import { TitleBarProps } from './title-bar.props';
import { textStylePresets, TITLE_WRAPPER_STYLE } from './title-bar.presets';

export const TitleBar = ({
  title = '',
  subtitle,
  titleStyle = [],
  subtitleStyle = [],
  wrapperStyle = [],
  rightElement,
}: TitleBarProps) => (
  <View style={[...textStylePresets.wrapper, ...wrapperStyle]}>
    <View style={TITLE_WRAPPER_STYLE}>
      <Text style={[...textStylePresets.title, ...titleStyle]}>{title}</Text>
      {rightElement}
    </View>
    {subtitle && (
      <Text style={[...textStylePresets.subtitle, ...subtitleStyle]}>
        {subtitle}
      </Text>
    )}
  </View>
);
