import React from 'react';
import { View, Text } from 'react-native';

import { TextLink } from '../text-link/text-link';

import {
  CONTAINER_STYLE,
  TITLE_TEXT_STYLE,
  ACTION_TEXT_STYLE,
} from './section-header.presets';
import { SectionHeaderProps } from './section-header.props';

export const SectionHeader = ({
  title = '',
  actionText = '',
  containerStyle = [],
  titleTextStyle = [],
  actionTextStyle = [],
}: SectionHeaderProps) => (
  <View style={[...CONTAINER_STYLE, ...containerStyle]}>
    <Text style={[...TITLE_TEXT_STYLE, ...titleTextStyle]}>{title}</Text>
    <TextLink
      textStyle={[...ACTION_TEXT_STYLE, ...actionTextStyle]}
      text={actionText}
    />
  </View>
);
