import React from 'react';
import { View, Text, Image } from 'react-native';

import { TextLink } from '../text-link/text-link';

import {
  CONTAINER_STYLE,
  TITLE_TEXT_STYLE,
  ACTION_TEXT_STYLE,
  IMAGE_STYLE,
  CONTENT_WRAPPER_STYLE,
} from './section-header.presets';
import { SectionHeaderProps } from './section-header.props';

export const SectionHeader = ({
  title = '',
  actionText = '',
  image,
  containerStyle = [],
  titleTextStyle = [],
  actionTextStyle = [],
  onActionPressed = () => {},
  actionComponent,
}: SectionHeaderProps) => (
  <View style={[...CONTAINER_STYLE, ...containerStyle]}>
    <View style={CONTENT_WRAPPER_STYLE}>
      {image && <Image style={IMAGE_STYLE} source={image} />}
      <Text style={[...TITLE_TEXT_STYLE, ...titleTextStyle]}>{title}</Text>
    </View>
    {actionComponent ? (
      actionComponent
    ) : (
      <TextLink
        textStyle={[...ACTION_TEXT_STYLE, ...actionTextStyle]}
        text={actionText}
        onPress={onActionPressed}
      />
    )}
  </View>
);
