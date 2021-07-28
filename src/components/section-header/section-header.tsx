import React from 'react';
import { View, Text, Image } from 'react-native';

import { TextLink } from '../text-link';
import { ServerImage } from '../server-image';

import {
  baseContainerStyle,
  baseTitleTextStyle,
  baseActionTextStyle,
  imageStyle,
  contentWrapperStyle,
} from './section-header.presets';
import { SectionHeaderProps } from './section-header.props';
import { ICON_SIZE } from '../../theme/sizes';

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
        {image ? (
          <ServerImage
            style={imageStyle}
            width={ICON_SIZE.S}
            height={ICON_SIZE.S}
            src={image}
          />
        ) : null}
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
