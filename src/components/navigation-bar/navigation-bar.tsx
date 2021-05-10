import React from 'react';
import { View, Text } from 'react-native';

import { BackButton } from '../back-button/back-button';

import {
  NAVIGATION_BAR_CONTAINER_STYLE,
  DEFAULT_NAVIGATION_BAR_WRAPPER_STYLE,
  SIDES_WRAPPER_STYLE,
  TITLE_TEXT_STYLE,
} from './navigation-bar.presets';
import { NavigationBarProps } from './navigation-bar.props';

export const NavigationBar = ({
  children,
  containerStyle = [],
  title = '',
  onBackPressed,
}: NavigationBarProps) => (
  <View style={[...NAVIGATION_BAR_CONTAINER_STYLE, ...containerStyle]}>
    {children ? (
      children
    ) : (
      <View style={DEFAULT_NAVIGATION_BAR_WRAPPER_STYLE}>
        <View style={SIDES_WRAPPER_STYLE}>
          <BackButton onPress={onBackPressed} />
        </View>
        <View>
          <Text style={TITLE_TEXT_STYLE}>{title}</Text>
        </View>
        <View style={SIDES_WRAPPER_STYLE} />
      </View>
    )}
  </View>
);
