import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export const Loading = () => (
  <View style={[s.flx_i, s.aic, s.jcfs, s.mt3]}>
    <ActivityIndicator />
  </View>
);
