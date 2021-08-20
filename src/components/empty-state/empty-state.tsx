import React from 'react';
import { View, Text } from 'react-native';
import Emoji from 'node-emoji';

import {
  containerStyle,
  emojiStyle,
  emptyStateTitleTextStyle,
  emptyStateDescriptionTextStyle,
} from './empty-state.presets';
import { EmptyStateProps } from './empty-state.props';

export const EmptyState = ({
  emojiCode = 'cry',
  title = '',
  description = '',
}: EmptyStateProps): JSX.Element => {
  return (
    <View style={containerStyle}>
      <Text style={emojiStyle}>{Emoji.get(emojiCode)}</Text>
      <Text style={emptyStateTitleTextStyle}>{title}</Text>
      <Text style={emptyStateDescriptionTextStyle}>{description}</Text>
    </View>
  );
};
