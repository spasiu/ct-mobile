import React from 'react';
import { View, Text } from 'react-native';

import { BackButton } from '../back-button';

import {
  navigationBarContainerStyle,
  defaultNavigationBarWrapperStyle,
  sidesWrapperStyle,
  titleTextStyle,
} from './navigation-bar.presets';
import { NavigationBarProps } from './navigation-bar.props';

export const NavigationBar = ({
  children,
  containerStyle = [],
  title = '',
  onBackPressed,
}: NavigationBarProps): JSX.Element => (
  <View style={[...navigationBarContainerStyle, ...containerStyle]}>
    {children ? (
      children
    ) : (
      <View style={defaultNavigationBarWrapperStyle}>
        <View style={sidesWrapperStyle}>
          <BackButton onPress={onBackPressed} />
        </View>
        <View>
          <Text style={titleTextStyle}>{title}</Text>
        </View>
        <View style={sidesWrapperStyle} />
      </View>
    )}
  </View>
);
