import React from 'react';
import { Text } from 'react-native';

import { IconButton } from '../icon-button/icon-button';

import {
  CONTAINER_STYLE_PRESETS,
  TEXT_STYLE_PRESETS,
} from './filter-item.presets';
import { FilterItemProps } from './filter-item.props';

export const FilterItem = ({
  children,
  type = 'pill',
  status = 'default',
  style = [],
  text,
  ...iconButtonProps
}: FilterItemProps) => {
  return (
    <IconButton
      {...iconButtonProps}
      style={[...CONTAINER_STYLE_PRESETS[type][status], ...style]}>
      {text ? (
        <Text style={[...TEXT_STYLE_PRESETS[type][status]]}>{text}</Text>
      ) : (
        children
      )}
    </IconButton>
  );
};
