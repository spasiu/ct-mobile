import React from 'react';
import { Text } from 'react-native';

import { IconButton } from '../icon-button';

import { containerStylePresets, textStylePresets } from './filter-item.presets';
import {
  FilterItemProps,
  FilterItemTypes,
  FilterItemStatusTypes,
} from './filter-item.props';

export const FilterItem = ({
  children,
  type = FilterItemTypes.pill_default,
  status = FilterItemStatusTypes.default,
  style = [],
  text,
  ...iconButtonProps
}: FilterItemProps): JSX.Element => {
  return (
    <IconButton
      {...iconButtonProps}
      style={[...containerStylePresets[type][status], ...style]}>
      {text ? (
        <Text style={[...textStylePresets[type][status]]}>{text}</Text>
      ) : (
        children
      )}
    </IconButton>
  );
};
