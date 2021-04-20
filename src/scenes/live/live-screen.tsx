import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import { styles as s, sizes } from 'react-native-style-tachyons';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { prepend } from 'ramda';

import {
  NavigationBar,
  IconButton,
  FollowButton,
  LiveCountBadge,
  StatusBadge,
  BuyButton,
} from '../../components';
import { COLORS } from '../../theme/colors';

import { PaymentModal } from '../payment/payment-modal';
import { EventDetailModal } from '../event-detail/event-detail-modal';
import { t } from '../../i18n/i18n';

const closeIcon = require('../../assets/close-icon.png');
const diamondIcon = require('../../assets/diamond-icon.png');
const shareIcon = require('../../assets/share-icon.png');
const shopIcon = require('../../assets/shop-icon.png');

export const LiveScreen = () => {
  const inputRef = useRef(null);

  const navigation = useNavigation();
  const [messages, setMessage] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showBreaks, setShowBreaks] = useState(false);

  return (
    <View style={[s.flx_i]}>
      <Video
        repeat
        source={{
          uri:
            'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8',
        }}
        resizeMode="cover"
        style={[s.absolute_fill]}
      />
      <LinearGradient
        colors={[COLORS.transparent, COLORS.alpha_black]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 1 }}
        style={[s.flx_i]}>
        <SafeAreaView style={[s.flx_i]}>
          <NavigationBar style={[s.mb1]}>
            <View style={[s.flx_row, s.flx_i, s.jcfs, s.aic]}>
              <Image
                style={[s.circle_m]}
                source={{ uri: 'https://source.unsplash.com/96x96/?user' }}
              />
              <Text
                numberOfLines={2}
                style={[s.white, s.ml2, s.ff_alt_sb, s.f6]}>
                {'Breaking bad w/ Golden Child'}
              </Text>
            </View>
            <View style={[s.flx_ratio(0.2), s.jcc, s.aife]}>
              <IconButton onPress={() => navigation.goBack()}>
                <Image
                  style={[s.icon_xs]}
                  source={closeIcon}
                  resizeMode={'contain'}
                />
              </IconButton>
            </View>
          </NavigationBar>
          <View style={[s.flx_i, s.mh3, s.aife]}>
            <View style={[s.flx_row, s.w_100, s.mb3]}>
              <FollowButton type={'default'} />
              <View style={[s.flx_i, s.flx_row, s.jcfe]}>
                <StatusBadge status="live" />
                <LiveCountBadge containerStyle={[s.ml2]} count="321" />
              </View>
            </View>
            <View
              style={[
                s.w4,
                s.br4,
                s.pa2,
                s.jcsb,
                s.bg_alpha_primary,
                {
                  height: sizes.h3 + sizes.h2,
                },
              ]}>
              <Text
                style={[s.ff_alt_sb, s.f7, s.white]}
                numberOfLines={2}
                ellipsizeMode={'tail'}>
                {'2020 Bowman Baseball Sapphire'}
              </Text>
              <View style={[s.flx_row, s.jcsb]}>
                <Text style={[s.ff_alt_sb, s.f7, s.white]}>{'$110'}</Text>
                <Text style={[s.ff_alt_r, s.f7, s.white]}>{'3 remaining'}</Text>
              </View>
              <BuyButton onPress={() => setShowPayment(true)} />
            </View>
          </View>
          <KeyboardAvoidingView
            behavior="padding"
            style={[s.flx_i, s.w_100, s.jcfe, s.ph3]}>
            <View style={[s.w_100, { height: sizes.h4 + sizes.h2 }]}>
              <FlatList
                inverted
                style={[s.flx_i]}
                data={messages}
                renderItem={({ item }) => (
                  <View style={[s.flx_i, s.flx_row, s.mv2]}>
                    <Image
                      style={[s.circle_xs]}
                      source={{
                        uri: 'https://source.unsplash.com/96x96/?user',
                      }}
                    />
                    <Text style={[s.ml1, s.flx_i, s.ff_m, s.f6, s.white]}>
                      <Text style={[s.ff_b, s.f5, s.white]}>{'cardking'}</Text>{' '}
                      {item}
                    </Text>
                  </View>
                )}
              />
            </View>
            <View style={[s.flx_row, s.aife, s.h3, s.aic]}>
              <TextInput
                ref={inputRef}
                keyboardType="default"
                returnKeyType="done"
                enablesReturnKeyAutomatically
                blurOnSubmit={false}
                onSubmitEditing={event => {
                  setMessage(prepend(event.nativeEvent.text, messages));
                  if (inputRef && inputRef.current) {
                    inputRef.current.clear();
                  }
                }}
                placeholderTextColor={COLORS.white}
                placeholder={'Comment'}
                style={[
                  s.pl3,
                  s.pr3,
                  s.ff_alt_r,
                  s.f5,
                  s.white,
                  s.flx_ratio(0.55),
                  s.ba,
                  s.b__white,
                  s.br5,
                  { height: sizes.h2 + sizes.h1 / 2 },
                ]}
              />
              <View style={[s.flx_ratio(0.4), s.flx_row, s.jcsb, s.ml3]}>
                <IconButton>
                  <Image source={diamondIcon} />
                </IconButton>
                <IconButton>
                  <Image source={shareIcon} />
                </IconButton>
                <IconButton onPress={() => setShowBreaks(true)}>
                  <Image source={shopIcon} />
                </IconButton>
              </View>
            </View>
          </KeyboardAvoidingView>
          <PaymentModal
            productImage={{ uri: 'https://source.unsplash.com/100x100/?card' }}
            productTitle={'2020 Bowman Baseball Sapphire Edition'}
            productDescription={
              '8 spot Hit Draft. 8 packs x 4 cards. 1 Prospect Auto. Hunt for Bowman Sapphire parallels and Chrome'
            }
            price={'110.00'}
            visible={showPayment}
            onPressClose={() => setShowPayment(false)}
          />
          <EventDetailModal
            modalTitle={t('event.liveDetailTitle')}
            showHeader={false}
            visible={showBreaks}
            onPressClose={() => setShowBreaks(false)}
          />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
