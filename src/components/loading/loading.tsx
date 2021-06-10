import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { loadingWrapperStyle } from './loading.presets';
import { LoadingProps } from './loading.props';

export const Loading = ({ containerStyle = [] }: LoadingProps): JSX.Element => (
  <View style={[...loadingWrapperStyle, ...containerStyle]}>
    <ActivityIndicator />
  </View>
);
