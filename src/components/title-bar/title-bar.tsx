import React from 'react';
import { View, Text } from 'react-native';

import { TitleBarProps } from './title-bar.props';
import { textStylePresets, titleWrapperStyle } from './title-bar.presets';

export const TitleBar = ({
  title = '',
  subtitle,
  titleStyle = [],
  subtitleStyle = [],
  wrapperStyle = [],
  rightElement,
}: TitleBarProps): JSX.Element => {
  return (
    <View style={[...textStylePresets.wrapper, ...wrapperStyle]}>
      <View style={titleWrapperStyle}>
        <Text style={[...textStylePresets.title, ...titleStyle]}>{title}</Text>
        {rightElement}
      </View>
      {subtitle ? (
        <Text style={[...textStylePresets.subtitle, ...subtitleStyle]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};
