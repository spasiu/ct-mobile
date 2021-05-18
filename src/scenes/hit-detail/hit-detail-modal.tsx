import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { OverScreenModal, ImageCard } from '../../components';

export const HitDetailModal = ({ route, navigation }) => {
  const {
    image = { uri: 'https://source.unsplash.com/600x801/?sports' },
    title = 'Luis Robert',
    description = '2020 Bowman’s Best Autograph Issue RC',
  } = route.params;
  return (
    <OverScreenModal onPressClose={() => navigation.goBack()}>
      <ScrollView
        style={[s.flx_i, s.mb3, s.mt4]}
        contentContainerStyle={[s.aic]}>
        <ImageCard cardSize="large" image={image} />
        <View style={[s.flx_i, s.mh5]}>
          <Text style={[s.ff_b, s.f3, s.black, s.mt4, s.mb2]}>{title}</Text>
          <Text
            style={[s.ff_alt_r, s.f5, s.black]}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {description}
          </Text>
        </View>
      </ScrollView>
    </OverScreenModal>
  );
};
