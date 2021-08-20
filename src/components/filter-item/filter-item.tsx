import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../theme/colors';

import { IconButton } from '../icon-button';

import {
  containerStylePresets,
  textStylePresets,
  circleGradientBackgroundStyle,
  circleInsetWrapper,
} from './filter-item.presets';
import {
  FilterItemProps,
  FilterItemTypes,
  FilterItemStatusTypes,
} from './filter-item.props';
import { isTypeCircle } from './filter-item.utils';

export const FilterItem = ({
  children,
  type = FilterItemTypes.pill_default,
  status = FilterItemStatusTypes.default,
  style = [],
  text,
  ...iconButtonProps
}: FilterItemProps): JSX.Element => {
  const itemContent = text ? (
    <Text style={[...textStylePresets[type][status]]}>{text}</Text>
  ) : (
    children
  );

  const circleWrapper = isTypeCircle(type) ? (
    <LinearGradient
      style={circleGradientBackgroundStyle}
      colors={[COLORS.secondary, COLORS.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <View style={circleInsetWrapper}>{itemContent}</View>
    </LinearGradient>
  ) : (
    itemContent
  );
  return (
    <IconButton
      {...iconButtonProps}
      style={[...containerStylePresets[type][status], ...style]}>
      {circleWrapper}
    </IconButton>
  );
};
