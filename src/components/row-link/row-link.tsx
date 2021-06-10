import React from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
  rowLinkContainerStyle,
  contentWrapperStyle,
  baseIconStyle,
  baseTextStyle,
  arrowWrapperStyle,
  arrowStyle,
  arrowRightIcon,
} from './row-link.presets';
import { RowLinkProps } from './row-link.props';

export const RowLink = ({
  icon,
  text = '',
  containerStyle = [],
  textStyle = [],
  iconStyle = [],
  enabled = true,
  showArrow = true,
  rightElement,
  rightElementContainerStyle = [],
  ...buttonProps
}: RowLinkProps): JSX.Element => {
  const showOnRight = showArrow ? (
    <Image style={arrowStyle} source={arrowRightIcon} resizeMode={'contain'} />
  ) : null;
  return (
    <BorderlessButton {...buttonProps} style={containerStyle} enabled={enabled}>
      <View accessible style={rowLinkContainerStyle}>
        <View style={contentWrapperStyle}>
          {icon ? (
            <Image
              style={[...baseIconStyle, ...iconStyle]}
              source={icon}
              resizeMode={'contain'}
            />
          ) : null}
          <Text style={[...baseTextStyle, ...textStyle]}>{text}</Text>
        </View>
        <View style={[...arrowWrapperStyle, ...rightElementContainerStyle]}>
          {rightElement ? rightElement : showOnRight}
        </View>
      </View>
    </BorderlessButton>
  );
};
