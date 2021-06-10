import React from 'react';
import { View } from 'react-native';
import { map, range } from 'ramda';

import {
  baseContainerStyle,
  baseIndicatorWrapperStyle,
  indicatorTypeStyle,
  defaultIndicatorColorStyle,
  activeIndicatorColorStyle,
  baseButtonsWrapperStyle,
} from './pagination.presets';
import { PaginationProps, PageIndicatorTypes } from './pagination.props';

export const Pagination = ({
  index,
  total,
  pageIndicator = PageIndicatorTypes.dot,
  rightButton,
  leftButton,
  indicatorColor = defaultIndicatorColorStyle,
  activeIndicatorColor = activeIndicatorColorStyle,
  containerStyle = [],
}: PaginationProps): JSX.Element => (
  <View style={[...baseContainerStyle, ...containerStyle]}>
    <View style={baseButtonsWrapperStyle}>{leftButton}</View>
    <View style={baseIndicatorWrapperStyle}>
      {map(
        rangeIndex => (
          <View
            key={rangeIndex}
            style={[
              ...indicatorTypeStyle[pageIndicator],
              index === rangeIndex ? activeIndicatorColor : indicatorColor,
            ]}
          />
        ),
        range(0, total),
      )}
    </View>
    <View style={baseButtonsWrapperStyle}>{rightButton}</View>
  </View>
);
