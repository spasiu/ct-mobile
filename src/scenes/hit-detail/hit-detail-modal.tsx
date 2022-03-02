import React, { useState } from 'react';
import { Text, ScrollView, View, Image, Dimensions } from 'react-native';
import { styles as s, sizes } from 'react-native-style-tachyons';

import { OverScreenModal, ImageCard, IconButton } from '../../components';
import { CARD_SIZES } from '../../components/image-card/image-card.presets';
import { HitDetailModalProps } from './hit-detail-modal.props';
import { shareHit } from './hit-detail-modal.utils';
import ImageZoom from 'react-native-image-pan-zoom';
const shareIcon = require('../../assets/share-icon.png');
const flipIcon = require('../../assets/flip-icon.png');
const closeIcon = require('../../assets/close-icon.png');

export const HitDetailModal = ({
  isVisible,
  onPressClose,
  image_front = '',
  image_back = '',
  player = '',
  description = '',
  user = '',
  breaker = '',
}: HitDetailModalProps): JSX.Element => {
  const [showBack, setShowBack] = useState(false);
  const [zoom, setZoom] = useState(false);

  return (
    <OverScreenModal onPressClose={onPressClose} isVisible={isVisible}>
      <View
        style={[ s.absolute, s.icon_xs, s.right_2, s.mr3, {marginTop: sizes.mr3 - sizes.mr1 / 2}]}>
        <IconButton
          onPress={() => shareHit(player, image_front, CARD_SIZES.large)}>
          <Image
            resizeMode={'contain'}
            source={shareIcon}
            style={[s.tint_black, s.icon_xs]}
          />
        </IconButton>
      </View>
      {image_back && !zoom?
        <View style={[ s.absolute, s.icon_xs, s.right_2, s.mr3, s.mt8, {zIndex: 1, elevation: 1}]}>
          <IconButton
            onPress={() => setShowBack(!showBack)}>
            <Image
              resizeMode={'contain'}
              source={flipIcon}
              style={[s.tint_black, s.icon_xs]}
            />
          </IconButton>
        </View> : null}
        
        {zoom ?
        <View style={[ s.absolute, s.icon_xs, s.left_2, s.ml3, s.mt6, {zIndex: 1, elevation: 1}]}>
          <IconButton
            onPress={() => setZoom(false)}>
            <Image
              resizeMode={'contain'}
              source={closeIcon}
              style={[s.tint_black, s.icon_xs]}
            />
          </IconButton>
        </View> : null}
      <ScrollView
        style={[s.flx_i, s.mb3, s.mt4]}
        contentContainerStyle={[s.aic]}>
        <View>
          {zoom ?
            <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width} imageHeight={Dimensions.get('window').height}
            pinchToZoom={true}>
              <ImageCard onPress={() => setZoom(false)}
                cardWidth={Dimensions.get('window').width}
                cardHeight={Dimensions.get('window').height}
                containerStyle={[s.br0]}
                image={showBack ? image_back : image_front} />
            </ImageZoom>
            :
            <ImageCard
              onPress={() => setZoom(true)}
              cardSize='large'
              containerStyle={[s.br0]}
              image={showBack ? image_back : image_front} />}
        </View>
        {!zoom ?
        <View style={[s.flx_i, s.mh5]}>
          <Text style={[s.ff_b, s.f3, s.black, s.mt4, s.mb2]}>{player}</Text>
          <Text
            style={[s.ff_alt_r, s.f5, s.black]}
            ellipsizeMode={'tail'}>
            {description}
          </Text>
          <Text
            style={[s.ff_alt_r, s.f5, s.black]}
            ellipsizeMode={'tail'}>
            {`Pulled for: ${user}`}
          </Text>
          <Text
            style={[s.ff_alt_r, s.f5, s.black]}
            ellipsizeMode={'tail'}>
            {`Pulled by: ${breaker}`}
          </Text>
        </View> : null }
      </ScrollView>
    </OverScreenModal>
  );
};
