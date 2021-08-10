import React from 'react';
import { Text, ScrollView, View, Image } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

import { OverScreenModal, ImageCard, IconButton } from '../../components';
import { CARD_SIZES } from '../../components/image-card/image-card.presets';

import { HitDetailModalProps } from './hit-detail-modal.props';
import { shareHit } from './hit-detail-modal.utils';

const shareIcon = require('../../assets/share-icon.png');

export const HitDetailModal = ({
  isVisible,
  onPressClose,
  image = '',
  name = '',
  description = '2020 Bowman’s Best Autograph Issue RC',
}: HitDetailModalProps): JSX.Element => {
  return (
    <OverScreenModal onPressClose={onPressClose} isVisible={isVisible}>
      <View
        style={[
          s.absolute,
          s.icon_xs,
          s.right_2,
          s.mr3,
          {
            marginTop: sizes.mr3 - sizes.mr1 / 2,
          },
        ]}>
        <IconButton onPress={() => shareHit(name, image, CARD_SIZES.large)}>
          <Image
            resizeMode={'contain'}
            source={shareIcon}
            style={[s.tint_black, s.icon_xs]}
          />
        </IconButton>
      </View>
      <ScrollView
        style={[s.flx_i, s.mb3, s.mt4]}
        contentContainerStyle={[s.aic]}>
        <ImageCard cardSize="large" image={image} />
        <View style={[s.flx_i, s.mh5]}>
          <Text style={[s.ff_b, s.f3, s.black, s.mt4, s.mb2]}>{name}</Text>
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
