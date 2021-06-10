import React from 'react';
import { View, Text, Image } from 'react-native';

import { TextLink } from '../text-link';

import {
  baseContainerStyle,
  baseTitleTextStyle,
  baseActionTextStyle,
  imageStyle,
  contentWrapperStyle,
} from './section-header.presets';
import { SectionHeaderProps } from './section-header.props';

export const SectionHeader = ({
  title = '',
  actionText = '',
  image,
  containerStyle = [],
  titleTextStyle = [],
  actionTextStyle = [],
  onActionPressed = () => undefined,
  actionComponent,
}: SectionHeaderProps): JSX.Element => {
  return (
    <View style={[...baseContainerStyle, ...containerStyle]}>
      <View style={contentWrapperStyle}>
        {image ? <Image style={imageStyle} source={image} /> : null}
        <Text style={[...baseTitleTextStyle, ...titleTextStyle]}>{title}</Text>
      </View>
      {actionComponent ? (
        actionComponent
      ) : (
        <TextLink
          textStyle={[...baseActionTextStyle, ...actionTextStyle]}
          text={actionText}
          onPress={onActionPressed}
        />
      )}
    </View>
  );
};
