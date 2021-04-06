import React from 'react';
import { View } from 'react-native';
import { map, range } from 'ramda';

import {
  BASE_CONTAINER_STYLE,
  BASE_INDICATOR_WRAPPER_STYLE,
  INDICATOR_TYPE_STYLE,
  DEFAULT_INDICATOR_STYLE,
  ACTIVE_INDICATOR_STYLE,
  BASE_BUTTONS_WRAPPER_STYLE,
} from './pagination.presets';
import { PaginationProps } from './pagination.props';

export const Pagination = ({
  index,
  total,
  pageIndicator = 'dot',
  rightButton,
  leftButton,
  indicatorColor = DEFAULT_INDICATOR_STYLE,
  activeIndicatorColor = ACTIVE_INDICATOR_STYLE,
  containerStyle = [],
}: PaginationProps) => (
  <View style={[...BASE_CONTAINER_STYLE, ...containerStyle]}>
    <View style={BASE_BUTTONS_WRAPPER_STYLE}>{leftButton}</View>
    <View style={BASE_INDICATOR_WRAPPER_STYLE}>
      {map(
        rangeIndex => (
          <View
            key={rangeIndex}
            style={[
              ...INDICATOR_TYPE_STYLE[pageIndicator],
              index === rangeIndex ? activeIndicatorColor : indicatorColor,
            ]}
          />
        ),
        range(0, total),
      )}
    </View>
    <View style={BASE_BUTTONS_WRAPPER_STYLE}>{rightButton}</View>
  </View>
);
