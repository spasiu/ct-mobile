import React from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
  ROW_LINK_CONTAINER_STYLE,
  CONTENT_WRAPPER_STYLE,
  ICON_STYLE,
  TEXT_STYLE,
  ARROW_WRAPPER_STYLE,
  ARROW_STYLE,
} from './row-link.presets';
import { RowLinkProps } from './row-link.props';

const arrowRight = require('../../assets/arrow-right.png');

export const RowLink = ({
  icon,
  text = '',
  containerStyle = [],
  textStyle = [],
  ...buttonProps
}: RowLinkProps) => (
  <BorderlessButton {...buttonProps} style={containerStyle}>
    <View accessible style={ROW_LINK_CONTAINER_STYLE}>
      <View style={CONTENT_WRAPPER_STYLE}>
        {icon && (
          <Image style={ICON_STYLE} source={icon} resizeMode={'contain'} />
        )}
        <Text style={[...TEXT_STYLE, ...textStyle]}>{text}</Text>
      </View>
      <View style={ARROW_WRAPPER_STYLE}>
        <Image style={ARROW_STYLE} source={arrowRight} resizeMode={'contain'} />
      </View>
    </View>
  </BorderlessButton>
);
